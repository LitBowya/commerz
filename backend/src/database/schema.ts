// Database schema types for Kysely
// This file will contain all the TypeScript interfaces for our database tables

export interface Database {
  // Core entities - will be populated as we implement T016-T029
  merchants: MerchantTable;
  stores: StoreTable;
  products: ProductTable;
  product_variants: ProductVariantTable;
  customers: CustomerTable;
  addresses: AddressTable;
  orders: OrderTable;
  order_items: OrderItemTable;
  payments: PaymentTable;
  payment_gateways: PaymentGatewayTable;
  reviews: ReviewTable;
  locations: LocationTable;
  shipping_zones: ShippingZoneTable;
  store_themes: StoreThemeTable;
  
  // System tables
  system_health: SystemHealthTable;
}

// System tables
export interface SystemHealthTable {
  id: number;
  status: string;
  timestamp: Date;
}

// Placeholder interfaces for entities (will be detailed in T016-T029)
export interface MerchantTable {
  id: string;
  // Will be detailed in T016
}

export interface StoreTable {
  id: string;
  // Will be detailed in T017
}

export interface ProductTable {
  id: string;
  // Will be detailed in T018
}

export interface ProductVariantTable {
  id: string;
  // Will be detailed in T019
}

export interface CustomerTable {
  id: string;
  // Will be detailed in T020
}

export interface AddressTable {
  id: string;
  // Will be detailed in T021
}

export interface OrderTable {
  id: string;
  // Will be detailed in T022
}

export interface OrderItemTable {
  id: string;
  // Will be detailed in T023
}

export interface PaymentTable {
  id: string;
  // Will be detailed in T024
}

export interface PaymentGatewayTable {
  id: string;
  // Will be detailed in T025
}

export interface ReviewTable {
  id: string;
  // Will be detailed in T026
}

export interface LocationTable {
  id: string;
  // Will be detailed in T027
}

export interface ShippingZoneTable {
  id: string;
  // Will be detailed in T028
}

export interface StoreThemeTable {
  id: string;
  // Will be detailed in T029
}
