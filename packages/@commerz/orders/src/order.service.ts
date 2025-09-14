import {
  Order,
  OrderItem,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
  OrderFilters,
  Coupon,
  CouponType,
} from './types';

export class OrderService {
  /**
   * Generate unique order number
   */
  generateOrderNumber(storeId: string): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const storePrefix = storeId.substring(0, 3).toUpperCase();
    return `${storePrefix}-${timestamp.slice(-6)}-${random}`;
  }

  /**
   * Calculate order totals
   */
  calculateOrderTotals(
    items: OrderItem[],
    shippingAmount: number = 0,
    discountAmount: number = 0,
    taxRate: number = 0
  ): {
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
  } {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = Math.max(0, taxableAmount * taxRate);
    const totalAmount = subtotal + taxAmount + shippingAmount - discountAmount;

    return {
      subtotal,
      taxAmount: Math.round(taxAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  }

  /**
   * Validate order data
   */
  validateOrder(data: CreateOrderRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.storeId) {
      errors.push('Store ID is required');
    }

    if (!data.customerId) {
      errors.push('Customer ID is required');
    }

    if (!data.items || data.items.length === 0) {
      errors.push('Order must have at least one item');
    }

    if (!data.shippingAddress) {
      errors.push('Shipping address is required');
    } else {
      const addressErrors = this.validateAddress(data.shippingAddress);
      errors.push(...addressErrors);
    }

    if (!data.currency || data.currency.length !== 3) {
      errors.push('Valid 3-letter currency code is required');
    }

    // Validate items
    data.items?.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Product ID is required`);
      }
      if (item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be greater than 0`);
      }
      if (item.unitPrice < 0) {
        errors.push(`Item ${index + 1}: Unit price cannot be negative`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate address
   */
  private validateAddress(address: any): string[] {
    const errors: string[] = [];

    if (!address.firstName || address.firstName.trim().length < 1) {
      errors.push('First name is required');
    }

    if (!address.lastName || address.lastName.trim().length < 1) {
      errors.push('Last name is required');
    }

    if (!address.address1 || address.address1.trim().length < 1) {
      errors.push('Address line 1 is required');
    }

    if (!address.city || address.city.trim().length < 1) {
      errors.push('City is required');
    }

    if (!address.country || address.country.length !== 2) {
      errors.push('Valid 2-letter country code is required');
    }

    return errors;
  }

  /**
   * Check if order can be cancelled
   */
  canCancelOrder(order: Order): boolean {
    const cancellableStatuses = [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
    ];

    const nonCancellablePaymentStatuses = [
      PaymentStatus.PAID,
      PaymentStatus.PARTIALLY_PAID,
    ];

    return (
      cancellableStatuses.includes(order.status) &&
      !nonCancellablePaymentStatuses.includes(order.paymentStatus) &&
      order.fulfillmentStatus === FulfillmentStatus.UNFULFILLED
    );
  }

  /**
   * Check if order can be refunded
   */
  canRefundOrder(order: Order): boolean {
    const refundablePaymentStatuses = [
      PaymentStatus.PAID,
      PaymentStatus.PARTIALLY_PAID,
    ];

    return refundablePaymentStatuses.includes(order.paymentStatus);
  }

  /**
   * Calculate shipping weight
   */
  calculateShippingWeight(items: OrderItem[]): number {
    return items
      .filter(item => item.requiresShipping)
      .reduce((total, item) => total + ((item.weight || 0) * item.quantity), 0);
  }

  /**
   * Apply coupon discount
   */
  applyCoupon(
    coupon: Coupon,
    subtotal: number,
    items: OrderItem[]
  ): { discountAmount: number; isValid: boolean; error?: string } {
    // Check if coupon is active and valid
    if (!coupon.isActive) {
      return { discountAmount: 0, isValid: false, error: 'Coupon is not active' };
    }

    const now = new Date();
    if (now < coupon.validFrom) {
      return { discountAmount: 0, isValid: false, error: 'Coupon is not yet valid' };
    }

    if (coupon.validUntil && now > coupon.validUntil) {
      return { discountAmount: 0, isValid: false, error: 'Coupon has expired' };
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { discountAmount: 0, isValid: false, error: 'Coupon usage limit reached' };
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return {
        discountAmount: 0,
        isValid: false,
        error: `Minimum order amount of ${coupon.minOrderAmount} required`,
      };
    }

    // Calculate discount
    let discountAmount = 0;

    switch (coupon.type) {
      case CouponType.PERCENTAGE:
        discountAmount = (subtotal * coupon.value) / 100;
        break;
      case CouponType.FIXED_AMOUNT:
        discountAmount = coupon.value;
        break;
      case CouponType.FREE_SHIPPING:
        // This would be handled in shipping calculation
        discountAmount = 0;
        break;
    }

    // Apply maximum discount limit
    if (coupon.maxDiscountAmount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
    }

    // Don't allow discount to exceed subtotal
    discountAmount = Math.min(discountAmount, subtotal);

    return { discountAmount, isValid: true };
  }

  /**
   * Build order search query
   */
  buildOrderSearchQuery(filters: OrderFilters): string {
    const conditions: string[] = [];

    if (filters.storeId) {
      conditions.push(`store_id = '${filters.storeId}'`);
    }

    if (filters.customerId) {
      conditions.push(`customer_id = '${filters.customerId}'`);
    }

    if (filters.status && filters.status.length > 0) {
      const statusList = filters.status.map(s => `'${s}'`).join(',');
      conditions.push(`status IN (${statusList})`);
    }

    if (filters.paymentStatus && filters.paymentStatus.length > 0) {
      const paymentStatusList = filters.paymentStatus.map(s => `'${s}'`).join(',');
      conditions.push(`payment_status IN (${paymentStatusList})`);
    }

    if (filters.search) {
      conditions.push(`(order_number ILIKE '%${filters.search}%' OR notes ILIKE '%${filters.search}%')`);
    }

    if (filters.dateFrom) {
      conditions.push(`created_at >= '${filters.dateFrom.toISOString()}'`);
    }

    if (filters.dateTo) {
      conditions.push(`created_at <= '${filters.dateTo.toISOString()}'`);
    }

    if (filters.minAmount !== undefined) {
      conditions.push(`total_amount >= ${filters.minAmount}`);
    }

    if (filters.maxAmount !== undefined) {
      conditions.push(`total_amount <= ${filters.maxAmount}`);
    }

    return conditions.length > 0 ? conditions.join(' AND ') : '1=1';
  }
}
