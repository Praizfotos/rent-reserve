import { prisma } from "./client.js";

export const contributionRepository = {
  async create(data: {
    obligationId: string;
    contributorId: string;
    amount: bigint;
    asset: string;
    network: "TESTNET" | "MAINNET";
    transactionHash?: string;
  }) {
    return prisma.contribution.create({
      data: {
        ...data,
        status: "PENDING",
      },
    });
  },

  async confirm(id: string, ledger: bigint) {
    return prisma.contribution.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        confirmedAt: new Date(),
        ledger,
      },
    });
  },

  async findByObligation(obligationId: string) {
    return prisma.contribution.findMany({
      where: { obligationId },
      include: {
        contributor: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findByTransactionHash(transactionHash: string) {
    return prisma.contribution.findFirst({
      where: { transactionHash },
    });
  },

  async getContributorTotal(obligationId: string, contributorId: string) {
    const result = await prisma.contribution.aggregate({
      where: {
        obligationId,
        contributorId,
        status: "CONFIRMED",
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount ?? BigInt(0);
  },

  async getTotalFunded(obligationId: string) {
    const result = await prisma.contribution.aggregate({
      where: {
        obligationId,
        status: "CONFIRMED",
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount ?? BigInt(0);
  },
};
