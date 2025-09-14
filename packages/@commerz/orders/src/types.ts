// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  storeId: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  currency: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  paymentDetails: PaymentDetails;
  shippingDetails: ShippingDetails;
  notes?: string;
  internalNotes?: string;
  tags: string[];
  source: OrderSource;
  channel: string;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  cancelledAt?: Date;
  fulfilledAt?: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxAmount: number;
  discountAmount: number;
  weight?: number;
  requiresShipping: boolean;
  isDigital: boolean;
  metadata?: Record<string, any>;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  phoneNumber?: string;
  landmark?: string; // For African addressing
}

export interface PaymentDetails {
  method: PaymentMethod;
  provider: string;
  transactionId?: string;
  reference: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  paidAt?: Date;
  failureReason?: string;
  metadata?: Record<string, any>;
}

export interface ShippingDetails {
  method: string;
  carrier?: string;
  service: string;
  cost: number;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  trackingUrl?: string;
  weight?: number;
  dimensions?: ShippingDimensions;
}

export interface ShippingDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  RETURNED = 'returned',
}

export enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially_paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

export enum FulfillmentStatus {
  UNFULFILLED = 'unfulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  RETURNED = 'returned',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  MOBILE_MONEY = 'mobile_money',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  CRYPTO = 'crypto',
  WALLET = 'wallet',
}

export enum OrderSource {
  WEB = 'web',
  MOBILE = 'mobile',
  WHATSAPP = 'whatsapp',
  PHONE = 'phone',
  IN_PERSON = 'in_person',
  API = 'api',
}

// Order Requests
export interface CreateOrderRequest {
  storeId: string;
  customerId: string;
  items: CreateOrderItemRequest[];
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  shippingMethod: string;
  paymentMethod: PaymentMethod;
  currency: string;
  notes?: string;
  source: OrderSource;
  channel?: string;
  couponCode?: string;
}

export interface CreateOrderItemRequest {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderRequest {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  shippingAddress?: OrderAddress;
  billingAddress?: OrderAddress;
  notes?: string;
  internalNotes?: string;
  tags?: string[];
}

// Cart Types
export interface Cart {
  id: string;
  customerId?: string;
  sessionId: string;
  storeId: string;
  items: CartItem[];
  currency: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  shippingAddress?: OrderAddress;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addedAt: Date;
}

export interface AddToCartRequest {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Discount and Coupon Types
export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  perCustomerLimit?: number;
  validFrom: Date;
  validUntil?: Date;
  isActive: boolean;
  applicableProducts?: string[];
  applicableCategories?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CouponType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_SHIPPING = 'free_shipping',
}

// Order Filters
export interface OrderFilters {
  storeId?: string;
  customerId?: string;
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  fulfillmentStatus?: FulfillmentStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  source?: OrderSource[];
  search?: string;
}
