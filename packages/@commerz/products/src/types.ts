// Product Types
export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  category: string;
  subcategory?: string;
  brand?: string;
  status: ProductStatus;
  visibility: ProductVisibility;
  type: ProductType;
  weight?: number;
  dimensions?: ProductDimensions;
  images: ProductImage[];
  variants: ProductVariant[];
  basePrice: number;
  currency: string;
  taxClass?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  attributes: ProductAttribute[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  inventoryQuantity: number;
  lowStockThreshold?: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  attributes: VariantAttribute[];
  images: string[];
  barcode?: string;
  status: VariantStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in' | 'm';
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  position: number;
  size: number;
  format: string;
}

export interface ProductAttribute {
  key: string;
  value: string;
  type: AttributeType;
  isPublic: boolean;
}

export interface VariantAttribute {
  key: string;
  value: string;
  displayName?: string;
}

export enum ProductStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum ProductVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  HIDDEN = 'hidden',
}

export enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export enum VariantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

export enum AttributeType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  COLOR = 'color',
  SIZE = 'size',
}

// Product Requests/Responses
export interface CreateProductRequest {
  storeId: string;
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  category: string;
  subcategory?: string;
  brand?: string;
  type: ProductType;
  basePrice: number;
  currency: string;
  weight?: number;
  dimensions?: ProductDimensions;
  images?: Omit<ProductImage, 'id'>[];
  attributes?: ProductAttribute[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  status?: ProductStatus;
  visibility?: ProductVisibility;
}

export interface CreateVariantRequest {
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  inventoryQuantity: number;
  trackInventory?: boolean;
  allowBackorder?: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  attributes: VariantAttribute[];
  barcode?: string;
}

export interface UpdateVariantRequest extends Partial<CreateVariantRequest> {
  status?: VariantStatus;
}

// Product Filters
export interface ProductFilters {
  storeId?: string;
  category?: string;
  status?: ProductStatus;
  visibility?: ProductVisibility;
  type?: ProductType;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  tags?: string[];
  inStock?: boolean;
  brand?: string;
}

// Inventory Management
export interface InventoryUpdate {
  variantId: string;
  quantity: number;
  reason: InventoryUpdateReason;
  note?: string;
}

export enum InventoryUpdateReason {
  SALE = 'sale',
  RESTOCK = 'restock',
  ADJUSTMENT = 'adjustment',
  RETURN = 'return',
  DAMAGE = 'damage',
  TRANSFER = 'transfer',
}
