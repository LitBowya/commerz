import {
  Cart,
  CartItem,
  AddToCartRequest,
  UpdateCartItemRequest,
} from './types';

export class CartService {
  /**
   * Calculate cart totals
   */
  calculateCartTotals(
    items: CartItem[],
    taxRate: number = 0,
    discountAmount: number = 0
  ): {
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
  } {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = Math.max(0, taxableAmount * taxRate);
    const totalAmount = subtotal + taxAmount - discountAmount;

    return {
      subtotal,
      taxAmount: Math.round(taxAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  }

  /**
   * Validate add to cart request
   */
  validateAddToCart(data: AddToCartRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.productId) {
      errors.push('Product ID is required');
    }

    if (data.quantity <= 0) {
      errors.push('Quantity must be greater than 0');
    }

    if (data.quantity > 99) {
      errors.push('Quantity cannot exceed 99');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if item exists in cart
   */
  findCartItem(cart: Cart, productId: string, variantId?: string): CartItem | undefined {
    return cart.items.find(item => 
      item.productId === productId && 
      item.variantId === variantId
    );
  }

  /**
   * Add item to cart or update quantity if exists
   */
  addOrUpdateCartItem(
    cart: Cart,
    productId: string,
    variantId: string | undefined,
    quantity: number,
    unitPrice: number
  ): Cart {
    const existingItem = this.findCartItem(cart, productId, variantId);

    if (existingItem) {
      // Update existing item
      const updatedItems = cart.items.map(item => {
        if (item.id === existingItem.id) {
          const newQuantity = item.quantity + quantity;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * unitPrice,
          };
        }
        return item;
      });

      return {
        ...cart,
        items: updatedItems,
        updatedAt: new Date(),
      };
    } else {
      // Add new item
      const newItem: CartItem = {
        id: this.generateItemId(),
        cartId: cart.id,
        productId,
        variantId,
        quantity,
        unitPrice,
        totalPrice: quantity * unitPrice,
        addedAt: new Date(),
      };

      return {
        ...cart,
        items: [...cart.items, newItem],
        updatedAt: new Date(),
      };
    }
  }

  /**
   * Remove item from cart
   */
  removeCartItem(cart: Cart, itemId: string): Cart {
    return {
      ...cart,
      items: cart.items.filter(item => item.id !== itemId),
      updatedAt: new Date(),
    };
  }

  /**
   * Update cart item quantity
   */
  updateCartItemQuantity(cart: Cart, itemId: string, quantity: number): Cart {
    if (quantity <= 0) {
      return this.removeCartItem(cart, itemId);
    }

    const updatedItems = cart.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity,
          totalPrice: quantity * item.unitPrice,
        };
      }
      return item;
    });

    return {
      ...cart,
      items: updatedItems,
      updatedAt: new Date(),
    };
  }

  /**
   * Clear all items from cart
   */
  clearCart(cart: Cart): Cart {
    return {
      ...cart,
      items: [],
      subtotal: 0,
      taxAmount: 0,
      totalAmount: 0,
      discountAmount: 0,
      couponCode: undefined,
      updatedAt: new Date(),
    };
  }

  /**
   * Check if cart is expired
   */
  isCartExpired(cart: Cart): boolean {
    return new Date() > cart.expiresAt;
  }

  /**
   * Get cart item count
   */
  getItemCount(cart: Cart): number {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Generate unique item ID
   */
  private generateItemId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  /**
   * Validate cart for checkout
   */
  validateCartForCheckout(cart: Cart): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!cart.items || cart.items.length === 0) {
      errors.push('Cart is empty');
    }

    if (this.isCartExpired(cart)) {
      errors.push('Cart has expired');
    }

    // Check for items with zero quantity
    const invalidItems = cart.items.filter(item => item.quantity <= 0);
    if (invalidItems.length > 0) {
      errors.push('Cart contains items with invalid quantities');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
