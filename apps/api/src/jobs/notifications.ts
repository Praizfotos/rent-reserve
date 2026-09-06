import { prisma } from "../database/client.js";

const REMINDER_DAYS = [90, 60, 30, 14, 7, 3, 1];
const POLL_INTERVAL_MS = parseInt(process.env.NOTIFICATION_POLL_INTERVAL || "300000");

type Urgency = "LOW" | "NORMAL" | "IMPORTANT" | "HIGH" | "CRITICAL";

function getUrgency(daysRemaining: number): Urgency {
  if (daysRemaining > 90) return "LOW";
  if (daysRemaining > 30) return "NORMAL";
  if (daysRemaining > 14) return "IMPORTANT";
  if (daysRemaining > 7) return "HIGH";
  return "CRITICAL";
}

function getUrgencyLabel(urgency: Urgency): string {
  switch (urgency) {
    case "LOW":
      return "Planning";
    case "NORMAL":
      return "On track";
    case "IMPORTANT":
      return "Stay focused";
    case "HIGH":
      return "Almost due";
    case "CRITICAL":
      return "Final stretch";
  }
}

function calculateFundingRecommendation(
  targetAmount: bigint,
  fundedAmount: bigint,
  daysRemaining: number
): { recommendedMonthly: bigint; recommendedWeekly: bigint } {
  const remaining = targetAmount - fundedAmount;
  const monthsRemaining = Math.max(daysRemaining / 30, 1);
  const weeksRemaining = Math.max(daysRemaining / 7, 1);

  return {
    recommendedMonthly: BigInt(Math.ceil(Number(remaining) / monthsRemaining)),
    recommendedWeekly: BigInt(Math.ceil(Number(remaining) / weeksRemaining)),
  };
}

function formatAmount(amount: bigint, currency: string = "NGN"): string {
  const formatted = Number(amount).toLocaleString("en-NG");
  return `${currency === "NGN" ? "\u20A6" : "$"}${formatted}`;
}

function generateReminderTitle(
  daysRemaining: number,
  progressPct: number,
  urgency: Urgency
): string {
  if (daysRemaining <= 7) {
    return `Your rent is due in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}`;
  }

  return `Rent reminder: ${daysRemaining} days remaining`;
}

function generateReminderBody(
  targetAmount: bigint,
  fundedAmount: bigint,
  daysRemaining: number,
  urgency: Urgency
): string {
  const remaining = targetAmount - fundedAmount;
  const progressPct = Number((fundedAmount * BigInt(100)) / targetAmount);
  const { recommendedMonthly, recommendedWeekly } =
    calculateFundingRecommendation(targetAmount, fundedAmount, daysRemaining);

  const lines: string[] = [];

  lines.push(`You've funded ${progressPct}% of your rent.`);
  lines.push(`${formatAmount(remaining)} remaining.`);

  if (daysRemaining > 14) {
    lines.push(
      `Suggested pace: ${formatAmount(recommendedWeekly)}/week or ${formatAmount(recommendedMonthly)}/month`
    );
  } else if (daysRemaining > 7) {
    lines.push(`Consider contributing ${formatAmount(recommendedWeekly)} this week.`);
  } else {
    lines.push(`Final stretch! ${formatAmount(remaining)} to go.`);
  }

  return lines.join("\n");
}

async function scheduleReminder(
  userId: string,
  obligationId: string,
  type: string,
  title: string,
  body: string,
  scheduledFor: Date
): Promise<void> {
  const existing = await prisma.notification.findFirst({
    where: {
      userId,
      referenceId: obligationId,
      type,
      status: { in: ["SCHEDULED", "PROCESSING"] },
    },
  });

  if (existing) {
    return;
  }

  await prisma.notification.create({
    data: {
      userId,
      type,
      title,
      body,
      scheduledFor,
      channel: "IN_APP",
      referenceId: obligationId,
      status: "SCHEDULED",
    },
  });
}

async function processObligationReminders(): Promise<void> {
  const now = new Date();

  const activeObligations = await prisma.rentObligation.findMany({
    where: {
      status: { in: ["ACTIVE", "FUNDING", "PARTIALLY_FUNDED"] as any },
    },
    include: {
      tenant: true,
    },
  });

  for (const obligation of activeObligations) {
    const daysRemaining = Math.ceil(
      (obligation.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysRemaining <= 0) {
      continue;
    }

    const urgency = getUrgency(daysRemaining);
    const progressPct = Number(
      (obligation.fundedAmount * BigInt(100)) / obligation.targetAmount
    );

    for (const reminderDays of REMINDER_DAYS) {
      if (daysRemaining === reminderDays || daysRemaining === reminderDays - 1) {
        const title = generateReminderTitle(daysRemaining, progressPct, urgency);
        const body = generateReminderBody(
          obligation.targetAmount,
          obligation.fundedAmount,
          daysRemaining,
          urgency
        );

        const scheduledFor = new Date(now);
        scheduledFor.setHours(scheduledFor.getHours() + 1);

        await scheduleReminder(
          obligation.tenantId,
          obligation.id,
          `RENT_DUE_${reminderDays}`,
          title,
          body,
          scheduledFor
        );
      }
    }
  }
}

async function processFullyFundedNotifications(): Promise<void> {
  const recentlyFunded = await prisma.rentObligation.findMany({
    where: {
      status: "FULLY_FUNDED" as any,
    },
    include: {
      tenant: true,
    },
  });

  for (const obligation of recentlyFunded) {
    const existing = await prisma.notification.findFirst({
      where: {
        userId: obligation.tenantId,
        referenceId: obligation.id,
        type: "RENT_FULLY_FUNDED",
      },
    });

    if (!existing) {
      await prisma.notification.create({
        data: {
          userId: obligation.tenantId,
          type: "RENT_FULLY_FUNDED",
          title: "Rent fully funded!",
          body: `Your rent of ${formatAmount(obligation.targetAmount)} is fully funded. You can settle early.`,
          scheduledFor: new Date(),
          channel: "IN_APP",
          referenceId: obligation.id,
          status: "SCHEDULED",
        },
      });
    }
  }
}

async function sendPendingNotifications(): Promise<void> {
  const now = new Date();

  const pendingNotifications = await prisma.notification.findMany({
    where: {
      status: "SCHEDULED",
      scheduledFor: {
        lte: now,
      },
    },
    take: 50,
  });

  for (const notification of pendingNotifications) {
    try {
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: "PROCESSING" },
      });

      console.log(`Sending notification: ${notification.type} to user: ${notification.userId}`);

      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
        },
      });
    } catch (error) {
      console.error(`Failed to send notification ${notification.id}:`, error);

      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: "FAILED" },
      });
    }
  }
}

export async function startNotificationEngine(): Promise<void> {
  console.log("Starting notification engine");

  while (true) {
    try {
      await processObligationReminders();
      await processFullyFundedNotifications();
      await sendPendingNotifications();
    } catch (error) {
      console.error("Notification engine error:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}
