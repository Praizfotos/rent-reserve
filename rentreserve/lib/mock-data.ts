export interface RentObligation {
  id: string;
  name: string;
  landlord: string;
  annualRent: number;
  amountReserved: number;
  dueDate: string;
  dueDateLabel: string;
  contributionFrequency: "monthly" | "fortnightly" | "weekly";
  recommendedContribution: number;
  status: "active" | "settled" | "creating";
  createdAt: string;
}

export interface Contribution {
  id: string;
  obligationId: string;
  amount: number;
  date: string;
  dateLabel: string;
  status: "confirmed" | "pending" | "failed";
  txHash?: string;
}

export interface TimelineEvent {
  id: string;
  obligationId?: string;
  type: "contribution" | "created" | "reminder" | "milestone" | "settlement" | "wallet";
  title: string;
  description: string;
  amount?: number;
  date: string;
  dateLabel: string;
  severity: "default" | "positive" | "warning" | "info";
}

export interface WalletInfo {
  address: string;
  network: string;
  connected: boolean;
  balance: number;
}

export interface Settlement {
  id: string;
  obligationId: string;
  amount: number;
  status: "pending" | "confirmed" | "simulated";
  txHash: string;
  timestamp: string;
  timestampLabel: string;
  from: string;
  to: string;
  network: string;
}

export interface RentReadiness {
  rentAmount: number;
  amountReserved: number;
  remaining: number;
  daysRemaining: number;
  percentage: number;
  requiredMonthly: number;
  monthlyContribution: number;
  status: "on_track" | "at_risk" | "behind" | "ready" | "overdue";
  projectedReadyDate: string;
  projectedReadyLabel: string;
  statusMessage: string;
  monthsRemaining: number;
}

// ─── Shared Mock Data ───────────────────────────────────────────────

export const MOCK_OBLIGATIONS: RentObligation[] = [
  {
    id: "obl-1",
    name: "2-Bedroom Apartment, Lekki",
    landlord: "Mrs. Adunni Okafor",
    annualRent: 1_200_000,
    amountReserved: 735_000,
    dueDate: "2027-03-14",
    dueDateLabel: "14 March 2027",
    contributionFrequency: "monthly",
    recommendedContribution: 73_000,
    status: "active",
    createdAt: "2026-06-01",
  },
  {
    id: "obl-2",
    name: "Service Charge — Block B",
    landlord: "Block B Management",
    annualRent: 180_000,
    amountReserved: 81_000,
    dueDate: "2027-09-15",
    dueDateLabel: "15 September 2027",
    contributionFrequency: "monthly",
    recommendedContribution: 15_000,
    status: "active",
    createdAt: "2026-07-15",
  },
  {
    id: "obl-3",
    name: "Annual Rent — Ikoyi Studio",
    landlord: "Mr. Emeka Dibia",
    annualRent: 800_000,
    amountReserved: 800_000,
    dueDate: "2027-01-15",
    dueDateLabel: "15 January 2027",
    contributionFrequency: "monthly",
    recommendedContribution: 0,
    status: "settled",
    createdAt: "2026-03-01",
  },
];

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  { id: "c-1", obligationId: "obl-1", amount: 150_000, date: "2026-09-01", dateLabel: "1 Sep 2026", status: "confirmed", txHash: "a8f3e2c1...91c2" },
  { id: "c-2", obligationId: "obl-1", amount: 150_000, date: "2026-08-01", dateLabel: "1 Aug 2026", status: "confirmed", txHash: "b7e4d3a2...82b3" },
  { id: "c-3", obligationId: "obl-1", amount: 135_000, date: "2026-07-01", dateLabel: "1 Jul 2026", status: "confirmed", txHash: "c6f5e4b3...73c4" },
  { id: "c-4", obligationId: "obl-1", amount: 150_000, date: "2026-06-01", dateLabel: "1 Jun 2026", status: "confirmed", txHash: "d5a6f5c4...64d5" },
  { id: "c-5", obligationId: "obl-1", amount: 150_000, date: "2026-05-01", dateLabel: "1 May 2026", status: "confirmed", txHash: "e4b7a6d5...55e6" },
  { id: "c-6", obligationId: "obl-2", amount: 27_000, date: "2026-09-01", dateLabel: "1 Sep 2026", status: "confirmed", txHash: "f3c8b7e6...46f7" },
  { id: "c-7", obligationId: "obl-2", amount: 27_000, date: "2026-08-01", dateLabel: "1 Aug 2026", status: "confirmed", txHash: "a2d9c8f7...37a8" },
  { id: "c-8", obligationId: "obl-2", amount: 27_000, date: "2026-07-01", dateLabel: "1 Jul 2026", status: "confirmed", txHash: "b1e0d9a8...28b9" },
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  { id: "t-1", obligationId: "obl-1", type: "contribution", title: "Monthly contribution", description: "₦150,000 added to Lekki apartment reserve", amount: 150_000, date: "2026-09-01", dateLabel: "1 Sep 2026", severity: "positive" },
  { id: "t-2", obligationId: "obl-1", type: "reminder", title: "60-day reminder sent", description: "Email and push notification delivered", date: "2026-08-15", dateLabel: "15 Aug 2026", severity: "info" },
  { id: "t-3", obligationId: "obl-1", type: "contribution", title: "Monthly contribution", description: "₦150,000 added to Lekki apartment reserve", amount: 150_000, date: "2026-08-01", dateLabel: "1 Aug 2026", severity: "positive" },
  { id: "t-4", obligationId: "obl-2", type: "created", title: "Obligation created", description: "Service charge — Block B. ₦180,000 over 12 months.", amount: 180_000, date: "2026-07-15", dateLabel: "15 Jul 2026", severity: "default" },
  { id: "t-5", obligationId: "obl-1", type: "contribution", title: "Monthly contribution", description: "₦135,000 added to Lekki apartment reserve", amount: 135_000, date: "2026-07-01", dateLabel: "1 Jul 2026", severity: "positive" },
  { id: "t-6", obligationId: "obl-1", type: "milestone", title: "50% funded", description: "Lekki apartment reserve reached ₦600,000", amount: 600_000, date: "2026-06-15", dateLabel: "15 Jun 2026", severity: "positive" },
  { id: "t-7", obligationId: "obl-1", type: "contribution", title: "Monthly contribution", description: "₦150,000 added to Lekki apartment reserve", amount: 150_000, date: "2026-06-01", dateLabel: "1 Jun 2026", severity: "positive" },
  { id: "t-8", obligationId: "obl-1", type: "contribution", title: "Monthly contribution", description: "₦150,000 added to Lekki apartment reserve", amount: 150_000, date: "2026-05-01", dateLabel: "1 May 2026", severity: "positive" },
  { id: "t-9", obligationId: "obl-1", type: "created", title: "Obligation created", description: "2-Bedroom Apartment, Lekki. ₦1,200,000 due 14 Mar 2027.", amount: 1_200_000, date: "2026-06-01", dateLabel: "1 Jun 2026", severity: "default" },
  { id: "t-10", obligationId: "obl-3", type: "settlement", title: "Obligation settled", description: "Ikoyi studio rent fully funded. ₦800,000 settled 16 days early.", amount: 800_000, date: "2027-01-15", dateLabel: "15 Jan 2027", severity: "positive" },
];

export const MOCK_WALLET: WalletInfo = {
  address: "GAK2MN7B4HT3XKP2VXQXZMW4J7THF4XFLJ3FYA67x9pQ",
  network: "Stellar Testnet",
  connected: true,
  balance: 1_847_500,
};

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: "stl-1",
    obligationId: "obl-3",
    amount: 800_000,
    status: "confirmed",
    txHash: "a8f3e2c1d4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0",
    timestamp: "2027-01-15T09:42:00Z",
    timestampLabel: "15 Jan 2027 · 09:42",
    from: "RentReserve Treasury",
    to: "Mr. Emeka Dibia",
    network: "Stellar",
  },
];

// ─── Rent Readiness Engine ──────────────────────────────────────────

function daysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  return Math.ceil((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

function addMonthsToDate(dateStr: string, months: number): string {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function calculateReadiness(
  obligation: RentObligation,
  monthlyContribution: number,
  referenceDate: string = new Date().toISOString().split("T")[0]
): RentReadiness {
  const rentAmount = obligation.annualRent;
  const amountReserved = obligation.amountReserved;
  const remaining = Math.max(0, rentAmount - amountReserved);
  const daysRemaining = Math.max(0, daysBetween(referenceDate, obligation.dueDate));
  const monthsRemaining = Math.max(1, daysRemaining / 30);
  const percentage = Math.min(100, Math.round((amountReserved / rentAmount) * 10000) / 100);
  const requiredMonthly = remaining > 0 ? Math.ceil(remaining / monthsRemaining) : 0;

  let projectedReadyDate: string;
  let projectedReadyLabel: string;

  if (monthlyContribution <= 0 || remaining <= 0) {
    projectedReadyDate = obligation.dueDate;
    projectedReadyLabel = remaining <= 0 ? "Already reserved" : "Never at current rate";
  } else {
    const monthsToComplete = Math.ceil(remaining / monthlyContribution);
    projectedReadyDate = addMonthsToDate(referenceDate, monthsToComplete);
    projectedReadyLabel = formatDateLabel(projectedReadyDate);
  }

  let status: RentReadiness["status"];
  let statusMessage: string;

  if (percentage >= 100) {
    status = "ready";
    statusMessage = "Fully reserved. Ready for settlement.";
  } else if (monthlyContribution <= 0) {
    status = "behind";
    statusMessage = "No contribution set. Start reserving to reach your target.";
  } else {
    const projectedDate = new Date(projectedReadyDate);
    const dueDate = new Date(obligation.dueDate);
    const diffDays = (dueDate.getTime() - projectedDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > 30) {
      status = "on_track";
      statusMessage = `You're on track. Ready ${formatDateLabel(projectedReadyDate)}, before rent day.`;
    } else if (diffDays > -15) {
      status = "at_risk";
      statusMessage = `Tight but possible. Ready around rent day.`;
    } else {
      status = "behind";
      statusMessage = `Behind schedule. Increase contributions to reach your target.`;
    }
  }

  return {
    rentAmount,
    amountReserved,
    remaining,
    daysRemaining,
    percentage,
    requiredMonthly,
    monthlyContribution,
    status,
    projectedReadyDate,
    projectedReadyLabel,
    statusMessage,
    monthsRemaining: Math.round(monthsRemaining),
  };
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getObligation(id: string): RentObligation | undefined {
  return MOCK_OBLIGATIONS.find((o) => o.id === id);
}

export function getContributions(obligationId: string): Contribution[] {
  return MOCK_CONTRIBUTIONS.filter((c) => c.obligationId === obligationId);
}

export function getTimelineForObligation(obligationId: string): TimelineEvent[] {
  return MOCK_TIMELINE.filter((e) => e.obligationId === obligationId);
}
