import { prisma } from "./client.js";

export const obligationRepository = {
  async create(data: {
    tenantId: string;
    landlordId: string;
    propertyId?: string;
    targetAmount: bigint;
    currency?: string;
    assetContract?: string;
    startDate: Date;
    dueDate: Date;
    chainObligationId?: string;
  }) {
    return prisma.rentObligation.create({
      data: {
        ...data,
        status: "DRAFT",
      },
      include: {
        tenant: true,
        landlord: true,
        property: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.rentObligation.findUnique({
      where: { id },
      include: {
        tenant: true,
        landlord: true,
        property: true,
        contributions: {
          where: { status: "CONFIRMED" },
          orderBy: { createdAt: "desc" },
        },
        settlement: true,
      },
    });
  },

  async findByTenant(tenantId: string) {
    return prisma.rentObligation.findMany({
      where: { tenantId },
      include: {
        property: true,
        contributions: {
          where: { status: "CONFIRMED" },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { dueDate: "asc" },
    });
  },

  async findByLandlord(landlordId: string) {
    return prisma.rentObligation.findMany({
      where: { landlordId },
      include: {
        tenant: true,
        property: true,
      },
      orderBy: { dueDate: "asc" },
    });
  },

  async updateStatus(id: string, status: string) {
    return prisma.rentObligation.update({
      where: { id },
      data: { status: status as any },
    });
  },

  async updateFundedAmount(id: string, amount: bigint) {
    const obligation = await prisma.rentObligation.findUnique({
      where: { id },
    });

    if (!obligation) {
      throw new Error("Obligation not found");
    }

    const newFunded = obligation.fundedAmount + amount;

    if (newFunded > obligation.targetAmount) {
      throw new Error("Contribution would exceed target");
    }

    const newStatus = newFunded === obligation.targetAmount ? "FULLY_FUNDED" : "PARTIALLY_FUNDED";

    return prisma.rentObligation.update({
      where: { id },
      data: {
        fundedAmount: newFunded,
        status: newStatus as any,
      },
    });
  },

  async findExpiring(daysUntilDue: number) {
    const now = new Date();
    const dueThreshold = new Date(now);
    dueThreshold.setDate(dueThreshold.getDate() + daysUntilDue);

    return prisma.rentObligation.findMany({
      where: {
        status: { in: ["ACTIVE", "FUNDING", "PARTIALLY_FUNDED"] as any },
        dueDate: {
          lte: dueThreshold,
          gte: now,
        },
      },
      include: {
        tenant: true,
      },
    });
  },

  async findPendingSettlements() {
    return prisma.rentObligation.findMany({
      where: {
        status: "FULLY_FUNDED" as any,
      },
      include: {
        tenant: true,
        landlord: true,
      },
    });
  },
};
