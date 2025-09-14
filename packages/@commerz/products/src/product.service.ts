import { v4 as uuidv4 } from 'uuid';
import {
  Product,
  ProductVariant,
  CreateProductRequest,
  UpdateProductRequest,
  CreateVariantRequest,
  UpdateVariantRequest,
  ProductFilters,
  ProductStatus,
  VariantStatus,
  InventoryUpdate,
  InventoryUpdateReason,
} from './types';

export class ProductService {
  /**
   * Validate product data
   */
  validateProduct(data: CreateProductRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Product name must be at least 2 characters long');
    }

    if (!data.description || data.description.trim().length < 10) {
      errors.push('Product description must be at least 10 characters long');
    }

    if (!data.sku || data.sku.trim().length < 1) {
      errors.push('SKU is required');
    }

    if (!data.category || data.category.trim().length < 1) {
      errors.push('Category is required');
    }

    if (data.basePrice <= 0) {
      errors.push('Base price must be greater than 0');
    }

    if (!data.currency || data.currency.length !== 3) {
      errors.push('Valid 3-letter currency code is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate product variant data
   */
  validateVariant(data: CreateVariantRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length < 1) {
      errors.push('Variant name is required');
    }

    if (!data.sku || data.sku.trim().length < 1) {
      errors.push('Variant SKU is required');
    }

    if (data.price < 0) {
      errors.push('Variant price cannot be negative');
    }

    if (data.inventoryQuantity < 0) {
      errors.push('Inventory quantity cannot be negative');
    }

    if (data.compareAtPrice !== undefined && data.compareAtPrice <= data.price) {
      errors.push('Compare at price should be higher than regular price');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate unique SKU
   */
  generateSKU(prefix: string = 'PRD'): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Calculate product price with variants
   */
  calculatePriceRange(product: Product): { min: number; max: number } {
    if (!product.variants || product.variants.length === 0) {
      return { min: product.basePrice, max: product.basePrice };
    }

    const activePrices = product.variants
      .filter(variant => variant.status === VariantStatus.ACTIVE)
      .map(variant => variant.price);

    if (activePrices.length === 0) {
      return { min: product.basePrice, max: product.basePrice };
    }

    return {
      min: Math.min(...activePrices),
      max: Math.max(...activePrices),
    };
  }

  /**
   * Check if product is in stock
   */
  isInStock(product: Product): boolean {
    if (!product.variants || product.variants.length === 0) {
      return true; // Simple products don't track inventory at product level
    }

    return product.variants.some(variant => 
      variant.status === VariantStatus.ACTIVE && 
      (!variant.trackInventory || variant.inventoryQuantity > 0 || variant.allowBackorder)
    );
  }

  /**
   * Calculate total inventory for product
   */
  getTotalInventory(product: Product): number {
    if (!product.variants || product.variants.length === 0) {
      return 0;
    }

    return product.variants
      .filter(variant => variant.trackInventory)
      .reduce((total, variant) => total + variant.inventoryQuantory, 0);
  }

  /**
   * Get low stock variants
   */
  getLowStockVariants(product: Product): ProductVariant[] {
    if (!product.variants) {
      return [];
    }

    return product.variants.filter(variant => 
      variant.trackInventory &&
      variant.lowStockThreshold &&
      variant.inventoryQuantity <= variant.lowStockThreshold
    );
  }

  /**
   * Apply inventory update
   */
  applyInventoryUpdate(variant: ProductVariant, update: InventoryUpdate): ProductVariant {
    if (!variant.trackInventory) {
      throw new Error('Cannot update inventory for variant that does not track inventory');
    }

    let newQuantity = variant.inventoryQuantity;

    switch (update.reason) {
      case InventoryUpdateReason.SALE:
        newQuantity -= update.quantity;
        break;
      case InventoryUpdateReason.RESTOCK:
      case InventoryUpdateReason.RETURN:
        newQuantity += update.quantity;
        break;
      case InventoryUpdateReason.ADJUSTMENT:
        newQuantity = update.quantity;
        break;
      case InventoryUpdateReason.DAMAGE:
      case InventoryUpdateReason.TRANSFER:
        newQuantity -= update.quantity;
        break;
    }

    if (newQuantity < 0 && !variant.allowBackorder) {
      throw new Error('Insufficient inventory and backorders not allowed');
    }

    return {
      ...variant,
      inventoryQuantity: Math.max(0, newQuantity),
      updatedAt: new Date(),
    };
  }

  /**
   * Build search query for products
   */
  buildSearchQuery(filters: ProductFilters): string {
    const conditions: string[] = [];

    if (filters.storeId) {
      conditions.push(`store_id = '${filters.storeId}'`);
    }

    if (filters.status) {
      conditions.push(`status = '${filters.status}'`);
    }

    if (filters.category) {
      conditions.push(`category = '${filters.category}'`);
    }

    if (filters.search) {
      conditions.push(`(name ILIKE '%${filters.search}%' OR description ILIKE '%${filters.search}%')`);
    }

    if (filters.priceMin !== undefined) {
      conditions.push(`base_price >= ${filters.priceMin}`);
    }

    if (filters.priceMax !== undefined) {
      conditions.push(`base_price <= ${filters.priceMax}`);
    }

    if (filters.brand) {
      conditions.push(`brand = '${filters.brand}'`);
    }

    return conditions.length > 0 ? conditions.join(' AND ') : '1=1';
  }
}
