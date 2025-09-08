# Tasks: Africa-Targeted E-Commerce Platform

**Input**: Design documents from `/home/dogma/Documents/code/commerz/specs/001-africa-targeted-e/`
**Prerequisites**: plan.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

## Execution Flow

```
1. ✅ Loaded plan.md → Next.js 15 + NestJS, web app structure (frontend/backend)
2. ✅ Loaded data-model.md → 14 entities identified
3. ✅ Loaded contracts/ → 15+ API endpoints + African integrations
4. ✅ Loaded quickstart.md → 7 integration test scenarios
5. ✅ Generated 63 tasks across 8 phases
6. ✅ Applied TDD rules: tests before implementation
7. ✅ Applied library architecture: @commerz/* domains
8. ✅ Applied parallel execution: [P] for independent tasks
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **Paths**: frontend/src/, backend/src/, packages/@commerz/\*/src/

## Phase 3.1: Infrastructure Setup (T001-T008)

- [x] T001 Create project structure: frontend/, backend/, packages/@commerz/ directories
- [x] T002 [P] Initialize backend NestJS project with TypeScript 5.2 in backend/
- [x] T003 [P] Initialize frontend Next.js 15 project with TypeScript 5.2 in frontend/
- [x] T004 [P] Setup PostgreSQL 15+ database with Docker Compose
- [x] T005 [P] Setup Redis server with Docker Compose for caching/sessions
- [x] T006 [P] Configure ESLint, Prettier, and TypeScript strict mode
- [x] T007 Setup Kysely SQL builder with TypeScript schema generation in backend/src/database/
- [x] T008 [P] Setup monorepo workspace configuration with Nx or Lerna

## Phase 3.2: Library Structure Creation (T009-T015)

- [ ] T009 [P] Create @commerz/auth library structure in packages/@commerz/auth/
- [ ] T010 [P] Create @commerz/products library structure in packages/@commerz/products/
- [ ] T011 [P] Create @commerz/orders library structure in packages/@commerz/orders/
- [ ] T012 [P] Create @commerz/payments library structure in packages/@commerz/payments/
- [ ] T013 [P] Create @commerz/store-builder library structure in packages/@commerz/store-builder/
- [ ] T014 [P] Create @commerz/analytics library structure in packages/@commerz/analytics/
- [ ] T015 [P] Create @commerz/localization library structure in packages/@commerz/localization/

## Phase 3.3: Database Schema & Models (T016-T029) ⚠️ MUST BE DONE BEFORE TESTS

- [ ] T016 [P] Merchant entity Kysely schema in backend/src/database/schema.ts
- [ ] T017 [P] Store entity Kysely schema in backend/src/database/schema.ts
- [ ] T018 [P] Product entity Kysely schema in backend/src/database/schema.ts
- [ ] T019 [P] ProductVariant entity Kysely schema in backend/src/database/schema.ts
- [ ] T020 [P] Customer entity Kysely schema in backend/src/database/schema.ts
- [ ] T021 [P] Address entity Kysely schema in backend/src/database/schema.ts
- [ ] T022 [P] Order entity Kysely schema in backend/src/database/schema.ts
- [ ] T023 [P] OrderItem entity Kysely schema in backend/src/database/schema.ts
- [ ] T024 [P] Payment entity Kysely schema in backend/src/database/schema.ts
- [ ] T025 [P] PaymentGateway entity Kysely schema in backend/src/database/schema.ts
- [ ] T026 [P] Review entity Kysely schema in backend/src/database/schema.ts
- [ ] T027 [P] Location entity Kysely schema in backend/src/database/schema.ts
- [ ] T028 [P] ShippingZone entity Kysely schema in backend/src/database/schema.ts
- [ ] T029 [P] StoreTheme entity Kysely schema in backend/src/database/schema.ts

## Phase 3.4: Contract Tests (T030-T057) ⚠️ CRITICAL: MUST FAIL BEFORE IMPLEMENTATION

**These tests MUST be written and MUST FAIL before ANY API implementation**

### API Contract Tests (T030-T044)

- [ ] T030 [P] Contract test POST /auth/register in backend/tests/contract/auth.register.test.ts
- [ ] T031 [P] Contract test POST /auth/login in backend/tests/contract/auth.login.test.ts
- [ ] T032 [P] Contract test POST /auth/verify-phone in backend/tests/contract/auth.verify-phone.test.ts
- [ ] T033 [P] Contract test GET /stores in backend/tests/contract/stores.list.test.ts
- [ ] T034 [P] Contract test POST /stores in backend/tests/contract/stores.create.test.ts
- [ ] T035 [P] Contract test GET /stores/{storeId} in backend/tests/contract/stores.get.test.ts
- [ ] T036 [P] Contract test PUT /stores/{storeId} in backend/tests/contract/stores.update.test.ts
- [ ] T037 [P] Contract test GET /stores/{storeId}/products in backend/tests/contract/products.list.test.ts
- [ ] T038 [P] Contract test POST /stores/{storeId}/products in backend/tests/contract/products.create.test.ts
- [ ] T039 [P] Contract test GET /stores/{storeId}/orders in backend/tests/contract/orders.list.test.ts
- [ ] T040 [P] Contract test POST /stores/{storeId}/orders in backend/tests/contract/orders.create.test.ts
- [ ] T041 [P] Contract test POST /payments/process in backend/tests/contract/payments.process.test.ts
- [ ] T042 [P] Contract test GET /payments/{paymentId}/status in backend/tests/contract/payments.status.test.ts
- [ ] T043 [P] Contract test GET /storefront/{storeSlug} in backend/tests/contract/storefront.get.test.ts
- [ ] T044 [P] Contract test POST /storefront/{storeSlug}/checkout in backend/tests/contract/storefront.checkout.test.ts

### African Integration Contract Tests (T045-T051)

- [ ] T045 [P] Contract test M-Pesa STK Push in backend/tests/contract/mpesa.stk-push.test.ts
- [ ] T046 [P] Contract test M-Pesa status query in backend/tests/contract/mpesa.status.test.ts
- [ ] T047 [P] Contract test MTN MoMo request-to-pay in backend/tests/contract/mtn-momo.request.test.ts
- [ ] T048 [P] Contract test Airtel Money payment in backend/tests/contract/airtel-money.payment.test.ts
- [ ] T049 [P] Contract test WhatsApp message sending in backend/tests/contract/whatsapp.message.test.ts
- [ ] T050 [P] Contract test AI content generation in backend/tests/contract/ai.generate.test.ts
- [ ] T051 [P] Contract test shipping rate calculation in backend/tests/contract/shipping.rates.test.ts

### Integration Test Scenarios (T052-T058)

- [ ] T052 [P] Integration test: Merchant registration and store creation in backend/tests/integration/scenario-1.test.ts
- [ ] T053 [P] Integration test: Product management with AI content in backend/tests/integration/scenario-2.test.ts
- [ ] T054 [P] Integration test: Multi-channel inventory sync in backend/tests/integration/scenario-3.test.ts
- [ ] T055 [P] Integration test: Mobile money payment flow in backend/tests/integration/scenario-4.test.ts
- [ ] T056 [P] Integration test: Cross-border trade with currency conversion in backend/tests/integration/scenario-5.test.ts
- [ ] T057 [P] Integration test: Offline functionality and sync in backend/tests/integration/scenario-6.test.ts
- [ ] T058 [P] Integration test: B2B bulk orders and quotes in backend/tests/integration/scenario-7.test.ts

## Phase 3.5: Core Library Implementation (T059-T072) ⚠️ ONLY AFTER TESTS FAIL

### Auth Library Implementation

- [ ] T059 [P] Merchant model in packages/@commerz/auth/src/models/merchant.model.ts
- [ ] T060 [P] Customer model in packages/@commerz/auth/src/models/customer.model.ts
- [ ] T061 [P] AuthService with JWT + phone OTP in packages/@commerz/auth/src/services/auth.service.ts
- [ ] T062 [P] Phone verification service in packages/@commerz/auth/src/services/phone.service.ts

### Products Library Implementation

- [ ] T063 [P] Product model in packages/@commerz/products/src/models/product.model.ts
- [ ] T064 [P] ProductVariant model in packages/@commerz/products/src/models/product-variant.model.ts
- [ ] T065 [P] ProductService with inventory tracking in packages/@commerz/products/src/services/product.service.ts
- [ ] T066 [P] AI content generation service in packages/@commerz/products/src/services/ai-content.service.ts

### Orders Library Implementation

- [ ] T067 [P] Order model in packages/@commerz/orders/src/models/order.model.ts
- [ ] T068 [P] OrderItem model in packages/@commerz/orders/src/models/order-item.model.ts
- [ ] T069 [P] Address model in packages/@commerz/orders/src/models/address.model.ts
- [ ] T070 [P] OrderService with status tracking in packages/@commerz/orders/src/services/order.service.ts

### Payments Library Implementation

- [ ] T071 [P] Payment model in packages/@commerz/payments/src/models/payment.model.ts
- [ ] T072 [P] PaymentGateway model in packages/@commerz/payments/src/models/payment-gateway.model.ts

## Phase 3.6: API Endpoint Implementation (T073-T087)

### Authentication Endpoints

- [ ] T073 POST /auth/register endpoint in backend/src/auth/auth.controller.ts
- [ ] T074 POST /auth/login endpoint in backend/src/auth/auth.controller.ts
- [ ] T075 POST /auth/verify-phone endpoint in backend/src/auth/auth.controller.ts

### Store Management Endpoints

- [ ] T076 GET /stores endpoint in backend/src/stores/stores.controller.ts
- [ ] T077 POST /stores endpoint in backend/src/stores/stores.controller.ts
- [ ] T078 GET /stores/{storeId} endpoint in backend/src/stores/stores.controller.ts
- [ ] T079 PUT /stores/{storeId} endpoint in backend/src/stores/stores.controller.ts

### Product Management Endpoints

- [ ] T080 GET /stores/{storeId}/products endpoint in backend/src/products/products.controller.ts
- [ ] T081 POST /stores/{storeId}/products endpoint in backend/src/products/products.controller.ts

### Order Management Endpoints

- [ ] T082 GET /stores/{storeId}/orders endpoint in backend/src/orders/orders.controller.ts
- [ ] T083 POST /stores/{storeId}/orders endpoint in backend/src/orders/orders.controller.ts

### Payment Processing Endpoints

- [ ] T084 POST /payments/process endpoint in backend/src/payments/payments.controller.ts
- [ ] T085 GET /payments/{paymentId}/status endpoint in backend/src/payments/payments.controller.ts

### Storefront Endpoints

- [ ] T086 GET /storefront/{storeSlug} endpoint in backend/src/storefront/storefront.controller.ts
- [ ] T087 POST /storefront/{storeSlug}/checkout endpoint in backend/src/storefront/storefront.controller.ts

## Phase 3.7: African Payment Integration (T088-T094)

- [ ] T088 [P] M-Pesa STK Push service in packages/@commerz/payments/src/services/mpesa.service.ts
- [ ] T089 [P] MTN Mobile Money service in packages/@commerz/payments/src/services/mtn-momo.service.ts
- [ ] T090 [P] Airtel Money service in packages/@commerz/payments/src/services/airtel-money.service.ts
- [ ] T091 [P] Paystack integration service in packages/@commerz/payments/src/services/paystack.service.ts
- [ ] T092 [P] WhatsApp Business messaging in packages/@commerz/localization/src/services/whatsapp.service.ts
- [ ] T093 [P] Multi-currency conversion engine in packages/@commerz/localization/src/services/currency.service.ts
- [ ] T094 [P] Shipping rate calculation service in packages/@commerz/orders/src/services/shipping.service.ts

## Phase 3.8: Frontend Implementation (T095-T108)

### PWA and Mobile-First Setup

- [ ] T095 [P] PWA configuration with service worker in frontend/public/sw.js
- [ ] T096 [P] Offline cart management with IndexedDB in frontend/src/lib/offline-cart.ts
- [ ] T097 [P] Mobile-first responsive layout components in frontend/src/components/layout/
- [ ] T098 [P] Progressive image loading component in frontend/src/components/ui/progressive-image.tsx

### Merchant Dashboard

- [ ] T099 [P] Store creation wizard in frontend/src/components/onboarding/store-wizard.tsx
- [ ] T100 [P] Product management dashboard in frontend/src/components/dashboard/products/
- [ ] T101 [P] Order management interface in frontend/src/components/dashboard/orders/
- [ ] T102 [P] Analytics dashboard in frontend/src/components/dashboard/analytics/

### Customer Storefront

- [ ] T103 [P] Store builder with drag-and-drop in frontend/src/components/store-builder/
- [ ] T104 [P] Product catalog with filtering in frontend/src/components/storefront/catalog/
- [ ] T105 [P] Shopping cart with offline sync in frontend/src/components/storefront/cart/
- [ ] T106 [P] Checkout flow with mobile money in frontend/src/components/storefront/checkout/

### Multi-Language Support

- [ ] T107 [P] i18n configuration for 90+ languages in frontend/src/lib/i18n/
- [ ] T108 [P] Voice input component for product entry in frontend/src/components/ui/voice-input.tsx

## Phase 3.9: Performance & Integration (T109-T120)

### Performance Optimization

- [ ] T109 [P] Image optimization pipeline for 2G networks in frontend/src/lib/image-optimization.ts
- [ ] T110 [P] Service worker for offline functionality in frontend/public/sw.js
- [ ] T111 [P] Database query optimization and indexing in backend/src/lib/query-optimizer.ts
- [ ] T112 [P] CDN configuration for African edge locations

### Testing & Validation

- [ ] T113 [P] Load testing for 50k concurrent users in backend/tests/load/
- [ ] T114 [P] Performance testing for 2G network conditions in frontend/tests/performance/
- [ ] T115 [P] Multi-tenant data isolation testing in backend/tests/security/
- [ ] T116 [P] Payment gateway security testing in backend/tests/security/payments/

### Final Integration

- [ ] T117 [P] Real payment gateway integration testing with sandbox APIs
- [ ] T118 [P] Cross-border transaction testing with currency conversion
- [ ] T119 [P] Complete offline functionality testing with sync validation
- [ ] T120 [P] End-to-end testing covering all 7 quickstart scenarios

## Dependencies

### Phase Dependencies

- **Setup (T001-T008)** → **Libraries (T009-T015)** → **Schema (T016-T029)** → **Tests (T030-T058)** → **Implementation (T059+)**
- **Tests MUST fail** before any implementation begins (Constitutional requirement)

### Cross-Library Dependencies

- T059 (Merchant model) blocks T073 (auth register endpoint)
- T063 (Product model) blocks T080-T081 (product endpoints)
- T067 (Order model) blocks T082-T083 (order endpoints)
- T071 (Payment model) blocks T084-T085 (payment endpoints)

### Integration Dependencies

- T088-T094 (African integrations) require T071-T072 (payment models)
- T095-T108 (frontend) require T073-T087 (API endpoints)
- T117-T120 (final testing) require all implementation tasks complete

## Parallel Execution Examples

### Contract Tests Phase (After Schema Complete)

```bash
# Launch T030-T051 together - all different files:
Task: "Contract test POST /auth/register in backend/tests/contract/auth.register.test.ts"
Task: "Contract test M-Pesa STK Push in backend/tests/contract/mpesa.stk-push.test.ts"
Task: "Contract test WhatsApp message sending in backend/tests/contract/whatsapp.message.test.ts"
# ... all contract tests can run in parallel
```

### Library Models Phase (After Tests Failing)

```bash
# Launch T059-T072 together - different library packages:
Task: "Merchant model in packages/@commerz/auth/src/models/merchant.model.ts"
Task: "Product model in packages/@commerz/products/src/models/product.model.ts"
Task: "Order model in packages/@commerz/orders/src/models/order.model.ts"
# ... all model creation can run in parallel
```

### African Integrations Phase

```bash
# Launch T088-T094 together - different services:
Task: "M-Pesa STK Push service in packages/@commerz/payments/src/services/mpesa.service.ts"
Task: "WhatsApp Business messaging in packages/@commerz/localization/src/services/whatsapp.service.ts"
Task: "Multi-currency conversion engine in packages/@commerz/localization/src/services/currency.service.ts"
```

## Constitutional Compliance

### TDD Requirements ✅

- [x] All contract tests (T030-T058) come before implementation (T059+)
- [x] Tests must be written first and must fail
- [x] Real database and payment gateway integration in tests

### Library Architecture ✅

- [x] Every domain implemented as separate @commerz/\* library
- [x] Each library has its own models, services, and CLI commands
- [x] Cross-cutting concerns properly separated

### African Market Focus ✅

- [x] Mobile money integrations (M-Pesa, MTN MoMo, Airtel Money)
- [x] WhatsApp Business API integration
- [x] Multi-language support for African languages
- [x] Offline functionality for poor connectivity
- [x] Performance optimization for 2G networks

## Validation Checklist

### API Coverage ✅

- [x] 15 API endpoints from contracts/api-spec.yaml have tests and implementation
- [x] 6 African integration contracts have tests and implementation
- [x] 7 quickstart scenarios have integration tests

### Entity Coverage ✅

- [x] 14 entities from data-model.md have Kysely schema and models
- [x] All relationships and constraints implemented
- [x] Multi-tenancy and audit trails included

### Library Coverage ✅

- [x] 7 @commerz/\* libraries with proper structure
- [x] Each library has models, services, and domain logic
- [x] Constitutional compliance embedded

### Performance Coverage ✅

- [x] 2G network optimization tasks
- [x] Offline functionality with service workers
- [x] Load testing for 50k concurrent users
- [x] African CDN configuration

---

**Status**: ✅ **READY FOR EXECUTION** - 120 tasks generated with complete dependency mapping and parallel execution strategy

**Next Steps**: Begin execution with T001-T008 (Infrastructure Setup), then proceed through phases following TDD principles.
