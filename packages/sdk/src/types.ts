import { Contract, SorobanRpc, xdr } from "@stellar/stellar-sdk";

export enum RentStatus {
  PendingAcceptance = 0,
  Active = 1,
  PartiallyFunded = 2,
  FullyFunded = 3,
  Settled = 4,
  Cancelled = 5,
  Expired = 6,
}

export interface RentObligation {
  id: string;
  tenant: string;
  landlord: string;
  propertyRef: string;
  asset: string;
  targetAmount: bigint;
  fundedAmount: bigint;
  startTime: bigint;
  dueTime: bigint;
  status: RentStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CreateObligationParams {
  tenant: string;
  landlord: string;
  propertyRef: string;
  asset: string;
  targetAmount: bigint;
  startTime: bigint;
  dueTime: bigint;
}

export interface ContributeParams {
  obligationId: string;
  contributor: string;
  amount: bigint;
}

export interface ContractError {
  code: number;
  message: string;
}

export enum ErrorCode {
  Unauthorized = 1,
  ObligationNotFound = 2,
  InvalidStateTransition = 3,
  InvalidAmount = 4,
  WouldExceedTarget = 5,
  AlreadySettled = 6,
  AlreadyCancelled = 7,
  Expired = 8,
  NotFullyFunded = 9,
  InvalidDueDate = 10,
  InvalidTarget = 11,
  ContractPaused = 12,
  ObligationNotActive = 13,
  InvalidTimeRange = 14,
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.Unauthorized]: "Unauthorized",
  [ErrorCode.ObligationNotFound]: "Obligation not found",
  [ErrorCode.InvalidStateTransition]: "Invalid state transition",
  [ErrorCode.InvalidAmount]: "Invalid amount",
  [ErrorCode.WouldExceedTarget]: "Would exceed target amount",
  [ErrorCode.AlreadySettled]: "Already settled",
  [ErrorCode.AlreadyCancelled]: "Already cancelled",
  [ErrorCode.Expired]: "Obligation expired",
  [ErrorCode.NotFullyFunded]: "Not fully funded",
  [ErrorCode.InvalidDueDate]: "Invalid due date",
  [ErrorCode.InvalidTarget]: "Invalid target amount",
  [ErrorCode.ContractPaused]: "Contract is paused",
  [ErrorCode.ObligationNotActive]: "Obligation not active",
  [ErrorCode.InvalidTimeRange]: "Invalid time range",
};
