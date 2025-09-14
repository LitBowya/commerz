// Payment Gateway Types
export interface PaymentGateway {
  id: string;
  name: string;
  type: PaymentGatewayType;
  isActive: boolean;
  supportedCountries: string[];
  supportedCurrencies: string[];
  supportedMethods: PaymentMethod[];
  configuration: GatewayConfiguration;
  fees: GatewayFee[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GatewayConfiguration {
  [key: string]: string | number | boolean;
}

export interface GatewayFee {
  method: PaymentMethod;
  type: FeeType;
  value: number;
  currency?: string;
  minAmount?: number;
  maxAmount?: number;
}

export enum PaymentGatewayType {
  MPESA = 'mpesa',
  PAYSTACK = 'paystack',
  PAWAPAY = 'pawapay',
  ONAFRIQ = 'onafriq',
  STRIPE = 'stripe',
  FLUTTERWAVE = 'flutterwave',
}

export enum PaymentMethod {
  MOBILE_MONEY = 'mobile_money',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  USSD = 'ussd',
  QR_CODE = 'qr_code',
  CASH = 'cash',
}

export enum FeeType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
  COMBINED = 'combined',
}

// Payment Transaction Types
export interface PaymentTransaction {
  id: string;
  orderId: string;
  gatewayId: string;
  method: PaymentMethod;
  status: PaymentTransactionStatus;
  amount: number;
  currency: string;
  feeAmount: number;
  netAmount: number;
  reference: string;
  gatewayReference?: string;
  description?: string;
  customerPhone?: string;
  customerEmail?: string;
  metadata: PaymentMetadata;
  initiatedAt: Date;
  processedAt?: Date;
  failedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMetadata {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  orderNumber?: string;
  storeName?: string;
  [key: string]: any;
}

export enum PaymentTransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

// Payment Requests
export interface InitiatePaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  gatewayId: string;
  customerPhone?: string;
  customerEmail?: string;
  description?: string;
  metadata?: PaymentMetadata;
  returnUrl?: string;
  webhookUrl?: string;
}

export interface InitiatePaymentResponse {
  transactionId: string;
  reference: string;
  status: PaymentTransactionStatus;
  paymentUrl?: string;
  instructions?: PaymentInstructions;
  expiresAt?: Date;
}

export interface PaymentInstructions {
  method: PaymentMethod;
  steps: string[];
  ussdCode?: string;
  qrCode?: string;
  accountDetails?: AccountDetails;
}

export interface AccountDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  reference: string;
}

export interface VerifyPaymentRequest {
  transactionId: string;
  reference: string;
}

export interface VerifyPaymentResponse {
  transactionId: string;
  status: PaymentTransactionStatus;
  amount: number;
  currency: string;
  gatewayReference?: string;
  paidAt?: Date;
  failureReason?: string;
}

// Mobile Money Specific Types
export interface MobileMoneyProvider {
  code: string;
  name: string;
  country: string;
  currency: string;
  regex: string; // Phone number validation regex
  minAmount: number;
  maxAmount: number;
  isActive: boolean;
}

export interface MobileMoneyRequest {
  phoneNumber: string;
  amount: number;
  currency: string;
  provider: string;
  reference: string;
  description: string;
}

// M-Pesa Specific Types
export interface MPesaSTKPushRequest {
  phoneNumber: string;
  amount: number;
  reference: string;
  description: string;
  callbackUrl: string;
}

export interface MPesaSTKPushResponse {
  merchantRequestId: string;
  checkoutRequestId: string;
  responseCode: string;
  responseDescription: string;
  customerMessage: string;
}

// Paystack Specific Types
export interface PaystackInitializeRequest {
  email: string;
  amount: number; // in kobo for NGN
  currency: string;
  reference: string;
  callbackUrl?: string;
  metadata?: PaymentMetadata;
  channels?: PaystackChannel[];
}

export enum PaystackChannel {
  CARD = 'card',
  BANK = 'bank',
  USSD = 'ussd',
  QR = 'qr',
  MOBILE_MONEY = 'mobile_money',
  BANK_TRANSFER = 'bank_transfer',
}

// Webhook Types
export interface PaymentWebhook {
  id: string;
  gatewayId: string;
  event: WebhookEvent;
  data: any;
  signature: string;
  processedAt?: Date;
  createdAt: Date;
}

export enum WebhookEvent {
  PAYMENT_SUCCESS = 'payment.success',
  PAYMENT_FAILED = 'payment.failed',
  PAYMENT_PENDING = 'payment.pending',
  PAYMENT_CANCELLED = 'payment.cancelled',
  REFUND_SUCCESS = 'refund.success',
  REFUND_FAILED = 'refund.failed',
}

// Refund Types
export interface RefundRequest {
  transactionId: string;
  amount?: number; // If not provided, full refund
  reason: string;
  metadata?: Record<string, any>;
}

export interface RefundResponse {
  refundId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: RefundStatus;
  reference: string;
  processedAt?: Date;
}

export enum RefundStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
}

// Gateway Selection Types
export interface GatewaySelectionCriteria {
  amount: number;
  currency: string;
  country: string;
  method: PaymentMethod;
  customerPhone?: string;
}

export interface GatewayRecommendation {
  gateway: PaymentGateway;
  score: number;
  reasons: string[];
  estimatedFee: number;
}

// Payment Analytics Types
export interface PaymentAnalytics {
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalAmount: number;
  successRate: number;
  averageAmount: number;
  topMethods: MethodStats[];
  topGateways: GatewayStats[];
  timeRange: {
    from: Date;
    to: Date;
  };
}

export interface MethodStats {
  method: PaymentMethod;
  count: number;
  amount: number;
  successRate: number;
}

export interface GatewayStats {
  gatewayId: string;
  gatewayName: string;
  count: number;
  amount: number;
  successRate: number;
  averageProcessingTime: number;
}
