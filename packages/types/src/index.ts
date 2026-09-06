export type UserRole = "TENANT" | "LANDLORD" | "PROPERTY_MANAGER" | "ADMIN";

export type Network = "TESTNET" | "MAINNET";

export type ObligationStatus =
  | "DRAFT"
  | "PENDING_ACCEPTANCE"
  | "ACTIVE"
  | "FUNDING"
  | "PARTIALLY_FUNDED"
  | "FULLY_FUNDED"
  | "READY_FOR_SETTLEMENT"
  | "SETTLING"
  | "SETTLED"
  | "CANCELLED"
  | "EXPIRED"
  | "DISPUTED";

export type ContributionStatus =
  | "PENDING"
  | "SUBMITTED"
  | "CONFIRMED"
  | "FAILED"
  | "REVERSED";

export type SettlementStatus =
  | "PENDING"
  | "SUBMITTED"
  | "CONFIRMED"
  | "FAILED";

export type NotificationChannel =
  | "IN_APP"
  | "EMAIL"
  | "SMS"
  | "WHATSAPP"
  | "PUSH";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  network: Network;
  address: string;
  isPrimary: boolean;
  createdAt: Date;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  reference?: string;
  city?: string;
  state?: string;
  country: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface RentObligation {
  id: string;
  chainObligationId?: string;
  tenantId: string;
  landlordId: string;
  propertyId?: string;
  targetAmount: bigint;
  currency: string;
  assetContract?: string;
  startDate: Date;
  dueDate: Date;
  fundedAmount: bigint;
  status: ObligationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contribution {
  id: string;
  obligationId: string;
  contributorId: string;
  amount: bigint;
  asset: string;
  network: Network;
  transactionHash?: string;
  ledger?: bigint;
  status: ContributionStatus;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface Settlement {
  id: string;
  obligationId: string;
  amount: bigint;
  asset: string;
  transactionHash?: string;
  status: SettlementStatus;
  initiatedAt: Date;
  submittedAt?: Date;
  confirmedAt?: Date;
}

export interface ContractEvent {
  id: string;
  eventType: string;
  obligationId?: string;
  contractId: string;
  ledger: bigint;
  transactionHash: string;
  data: Record<string, unknown>;
  processedAt: Date;
  createdAt: Date;
}

export interface CreateObligationRequest {
  tenantId: string;
  landlordId: string;
  propertyId?: string;
  targetAmount: string;
  currency?: string;
  assetContract?: string;
  startDate: string;
  dueDate: string;
}

export interface ContributeRequest {
  obligationId: string;
  contributorId: string;
  amount: string;
  asset: string;
  network: Network;
  transactionHash?: string;
}

export interface ObligationWithDetails extends RentObligation {
  tenant: User;
  landlord: User;
  property?: Property;
  contributions: Contribution[];
  settlement?: Settlement;
  remainingAmount: bigint;
  progressPercentage: number;
}

export interface DashboardStats {
  totalObligations: number;
  activeObligations: number;
  totalFunded: bigint;
  totalSettled: bigint;
  upcomingDueDates: ObligationWithDetails[];
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  scheduledFor: Date;
  sentAt?: Date;
  status: "SCHEDULED" | "PROCESSING" | "SENT" | "FAILED" | "CANCELLED";
  channel: NotificationChannel;
  referenceId?: string;
  createdAt: Date;
}

export interface ReminderConfig {
  daysBeforeDue: number[];
  channels: NotificationChannel[];
}

export interface FundingRecommendation {
  obligationId: string;
  remaining: bigint;
  daysRemaining: number;
  recommendedMonthly: bigint;
  recommendedWeekly: bigint;
  urgency: "LOW" | "NORMAL" | "IMPORTANT" | "HIGH" | "CRITICAL";
}
