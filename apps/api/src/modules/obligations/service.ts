import { RentReserveClient, CreateObligationParams, ContributeParams } from "@rentreserve/sdk";

const SERVER_URL = process.env.STELLAR_RPC_URL || "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE =
  process.env.STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015";
const CONTRACT_ID = process.env.CONTRACT_ID || "";

const client = new RentReserveClient(CONTRACT_ID, SERVER_URL, NETWORK_PASSPHRASE);

export const obligationService = {
  async createObligation(params: CreateObligationParams): Promise<string> {
    return client.createObligation(params, params.tenant);
  },

  async acceptObligation(obligationId: string, source: string): Promise<void> {
    return client.acceptObligation(obligationId, source);
  },

  async contribute(params: ContributeParams): Promise<void> {
    return client.contribute(params, params.contributor);
  },

  async settle(obligationId: string, source: string): Promise<void> {
    return client.settle(obligationId, source);
  },

  async cancel(obligationId: string, source: string): Promise<void> {
    return client.cancel(obligationId, source);
  },

  async getObligation(obligationId: string) {
    return client.getObligation(obligationId);
  },

  async getRemaining(obligationId: string) {
    return client.getRemaining(obligationId);
  },

  async getProgressPct(obligationId: string) {
    return client.getProgressPct(obligationId);
  },

  async getContributorTotal(obligationId: string, contributor: string) {
    return client.getContributorTotal(obligationId, contributor);
  },
};
