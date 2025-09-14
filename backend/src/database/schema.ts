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

// T016: Merchant entity Kysely schema
export interface MerchantTable {
  id: string; // UUID, primary key
  email: string; // unique, validated
  phone: string; // E.164 format, required for verification
  password_hash: string; // bcrypt hashed password
  first_name: string;
  last_name: string;
  business_name: string | null;
  business_type: 'individual' | 'sme' | 'cooperative' | 'enterprise';
  verification_status: 'pending' | 'verified' | 'suspended';
  verification_documents: object; // JSONB: ID type, ID number, business license
  preferred_language: string; // ISO 639-1
  country_code: string; // ISO 3166-1 alpha-2
  timezone: string; // IANA timezone
  created_at: Date;
  updated_at: Date;
  last_login_at: Date | null;
}

// T017: Store entity Kysely schema
export interface StoreTable {
  id: string; // UUID, primary key
  merchant_id: string; // UUID, foreign key → Merchant.id
  name: string; // required, 1-100 chars
  slug: string; // unique, URL-safe
  domain: string | null; // custom domain
  subdomain: string; // unique, auto-generated
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  theme_id: string; // UUID, foreign key → StoreTheme.id
  theme_config: object; // JSONB: colors, fonts, layout settings
  currency: string; // ISO 4217, required
  languages: string[]; // ISO 639-1 codes
  business_address: object; // JSONB: street, city, state, country, postal_code
  contact_email: string;
  contact_phone: string;
  social_links: object; // JSONB: facebook, instagram, twitter, whatsapp
  seo_settings: object; // JSONB: meta_title, meta_description, keywords
  is_active: boolean; // default true
  created_at: Date;
  updated_at: Date;
}

// T018: Product entity Kysely schema
export interface ProductTable {
  id: string; // UUID, primary key
  store_id: string; // UUID, foreign key → Store.id
  title: string; // required, 1-200 chars
  description: string | null;
  short_description: string | null; // 1-500 chars
  product_type: string | null; // for categorization
  vendor: string | null;
  tags: string[]; // searchable keywords
  status: 'draft' | 'active' | 'archived';
  seo_title: string | null;
  seo_description: string | null;
  handle: string; // URL-safe, unique within store
  images: object; // JSONB: array of {url, alt_text, sort_order}
  videos: object; // JSONB: array of {url, thumbnail, duration}
  ai_generated: boolean; // default false
  cultural_relevance: object; // JSONB: seasons, holidays, regions
  shipping_required: boolean; // default true
  weight: number | null; // grams
  dimensions: object | null; // JSONB: length, width, height in cm
  hs_code: string | null; // for customs
  origin_country: string; // ISO 3166-1 alpha-2
  created_at: Date;
  updated_at: Date;
}

// T019: ProductVariant entity Kysely schema
export interface ProductVariantTable {
  id: string; // UUID, primary key
  product_id: string; // UUID, foreign key → Product.id
  title: string; // required
  sku: string | null; // unique within store
  barcode: string | null;
  price: number; // decimal, in store currency
  compare_at_price: number | null; // original price
  cost_price: number | null; // for profit calculations
  inventory_quantity: number; // default 0
  inventory_policy: 'deny' | 'continue';
  track_inventory: boolean; // default true
  requires_shipping: boolean; // default true
  weight: number | null; // grams
  position: number; // sort order
  option1: string | null; // e.g., "Size"
  option2: string | null; // e.g., "Color"
  option3: string | null; // e.g., "Material"
  image_id: string | null; // reference to images array
  created_at: Date;
  updated_at: Date;
}

// T020: Customer entity Kysely schema
export interface CustomerTable {
  id: string; // UUID, primary key
  email: string | null; // unique if provided
  phone: string | null; // E.164 format
  password_hash: string | null; // for registered customers
  first_name: string | null;
  last_name: string | null;
  accepts_marketing: boolean; // default false
  preferred_language: string; // ISO 639-1
  country_code: string; // ISO 3166-1 alpha-2
  currency: string; // ISO 4217
  default_address_id: string | null; // UUID, foreign key → Address.id
  customer_type: 'guest' | 'registered' | 'business';
  business_name: string | null;
  tax_id: string | null;
  notes: string | null; // merchant notes
  tags: string[]; // for segmentation
  total_spent: number; // lifetime value
  orders_count: number; // default 0
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  last_order_at: Date | null;
}

// T021: Address entity Kysely schema
export interface AddressTable {
  id: string; // UUID, primary key
  customer_id: string; // UUID, foreign key → Customer.id
  type: 'shipping' | 'billing';
  first_name: string;
  last_name: string;
  company: string | null;
  address1: string; // required
  address2: string | null;
  landmark: string | null; // African addressing
  city: string; // required
  state: string | null;
  postal_code: string | null;
  country_code: string; // ISO 3166-1 alpha-2
  phone: string | null;
  is_default: boolean; // default false
  latitude: number | null;
  longitude: number | null;
  delivery_instructions: string | null;
  created_at: Date;
  updated_at: Date;
}

// T022: Order entity Kysely schema
export interface OrderTable {
  id: string; // UUID, primary key
  order_number: string; // unique, human-readable
  store_id: string; // UUID, foreign key → Store.id
  customer_id: string; // UUID, foreign key → Customer.id
  email: string | null; // for guest orders
  phone: string | null; // for notifications
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  financial_status: 'pending' | 'paid' | 'partially_paid' | 'refunded' | 'voided';
  fulfillment_status: 'unfulfilled' | 'partial' | 'fulfilled';
  currency: string; // ISO 4217
  subtotal: number; // before tax and shipping
  tax_total: number; // calculated tax
  shipping_total: number; // shipping cost
  discount_total: number; // applied discounts
  total: number; // final amount
  shipping_address: object; // JSONB, address details
  billing_address: object; // JSONB, address details
  shipping_method: string; // carrier and service
  tracking_number: string | null;
  tracking_url: string | null;
  notes: string | null; // customer notes
  tags: string[]; // for organization
  source: 'web' | 'mobile' | 'whatsapp' | 'facebook' | 'api';
  utm_source: string | null; // marketing attribution
  cancelled_at: Date | null;
  cancelled_reason: string | null;
  processed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// T023: OrderItem entity Kysely schema
export interface OrderItemTable {
  id: string; // UUID, primary key
  order_id: string; // UUID, foreign key → Order.id
  product_variant_id: string; // UUID, foreign key → ProductVariant.id
  quantity: number; // must be positive
  price: number; // price at time of order
  total: number; // calculated from quantity × price
  product_title: string; // snapshot at order time
  variant_title: string; // snapshot at order time
  sku: string | null; // snapshot
  weight: number | null; // for shipping
  requires_shipping: boolean;
  gift_card: boolean; // default false
  taxable: boolean; // default true
  properties: object; // JSONB, custom properties like engraving
  created_at: Date;
}

// T024: Payment entity Kysely schema
export interface PaymentTable {
  id: string; // UUID, primary key
  order_id: string; // UUID, foreign key → Order.id
  gateway_id: string; // UUID, foreign key → PaymentGateway.id
  transaction_id: string; // gateway transaction reference
  status: 'pending' | 'processing' | 'success' | 'failed' | 'cancelled' | 'refunded';
  amount: number; // payment amount
  currency: string; // ISO 4217
  exchange_rate: number | null; // for currency conversion
  gateway_fee: number; // gateway processing fee
  method: 'card' | 'mobile_money' | 'bank_transfer' | 'cash_on_delivery' | 'crypto';
  method_details: object; // JSONB: card last 4, mobile number, etc.
  processed_at: Date | null;
  gateway_response: object; // JSONB, full gateway response for debugging
  failure_reason: string | null;
  refund_amount: number; // default 0
  refunded_at: Date | null;
  metadata: object; // JSONB, additional payment context
  created_at: Date;
  updated_at: Date;
}

// T025: PaymentGateway entity Kysely schema
export interface PaymentGatewayTable {
  id: string; // UUID, primary key
  name: string; // e.g., "M-Pesa", "Paystack"
  provider: 'paystack' | 'flutterwave' | 'mpesa' | 'mtn_momo' | 'airtel_money' | 'paypal';
  countries: string[]; // ISO 3166-1 alpha-2 codes
  currencies: string[]; // ISO 4217 codes
  methods: string[]; // payment methods supported
  is_active: boolean; // default true
  is_test_mode: boolean; // default false
  configuration: object; // JSONB, encrypted credentials and settings
  fee_structure: object; // JSONB, transaction fees
  limits: object; // JSONB, min/max transaction amounts
  webhook_url: string; // for status updates
  created_at: Date;
  updated_at: Date;
}

// T026: Review entity Kysely schema
export interface ReviewTable {
  id: string; // UUID, primary key
  product_id: string; // UUID, foreign key → Product.id
  customer_id: string; // UUID, foreign key → Customer.id
  order_id: string | null; // UUID, foreign key → Order.id
  rating: number; // 1-5 scale
  title: string | null; // review headline
  body: string | null; // review content
  verified_purchase: boolean; // linked to order
  helpful_count: number; // default 0
  images: object; // JSONB, array of customer photos
  status: 'pending' | 'published' | 'hidden' | 'spam';
  merchant_response: string | null;
  responded_at: Date | null;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// T027: Location entity Kysely schema
export interface LocationTable {
  id: string; // UUID, primary key
  store_id: string; // UUID, foreign key → Store.id
  name: string; // location name
  type: 'warehouse' | 'retail' | 'pickup_point' | 'service_center';
  address: object; // JSONB, full address object
  latitude: number;
  longitude: number;
  is_active: boolean; // default true
  priority: number; // for sorting/preference
  contact_phone: string | null;
  contact_email: string | null;
  operating_hours: object; // JSONB, day → open/close times
  created_at: Date;
  updated_at: Date;
}

// T028: ShippingZone entity Kysely schema
export interface ShippingZoneTable {
  id: string; // UUID, primary key
  merchant_id: string; // UUID, foreign key → Merchant.id
  name: string; // zone name
  type: 'domestic' | 'continental' | 'international';
  countries: string[]; // ISO country codes
  regions: string[] | null; // state/province codes
  cities: string[] | null; // specific cities
  postal_codes: string[] | null; // postal code ranges
  free_shipping_threshold: number | null; // minimum order value
  flat_rate: number | null; // fixed shipping cost
  per_kg_rate: number | null; // weight-based pricing
  per_item_rate: number | null; // item-based pricing
  estimated_days_min: number; // minimum delivery days
  estimated_days_max: number; // maximum delivery days
  is_active: boolean; // default true
  created_at: Date;
  updated_at: Date;
}

// T029: StoreTheme entity Kysely schema
export interface StoreThemeTable {
  id: string; // UUID, primary key
  name: string; // theme name
  version: string; // semantic version
  type: 'default' | 'premium' | 'custom';
  category: 'electronics' | 'fashion' | 'home' | 'beauty' | 'food' | 'general';
  preview_url: string | null; // demo/preview link
  thumbnail_url: string | null; // theme preview image
  layout_config: object; // JSONB, page layout structure
  color_scheme: object; // JSONB, primary/secondary/accent colors
  typography: object; // JSONB, font families and sizes
  component_styles: object; // JSONB, CSS for components
  mobile_responsive: boolean; // default true
  rtl_support: boolean; // right-to-left languages
  price: number; // 0 for free themes
  currency: string; // default 'USD'
  is_active: boolean; // default true
  created_at: Date;
  updated_at: Date;
}
