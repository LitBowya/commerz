# Implementation Plan: Africa-Targeted E-Commerce Platform

**Branch**: `001-africa-targeted-e` | **Date**: September 7, 2025 | **Spec**: [/specs/001-africa-targeted-e/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-africa-targeted-e/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

A comprehensive, mobile-first e-commerce platform specifically designed for African markets, featuring progressive web app capabilities, offline functionality, multi-channel integration (WhatsApp, Facebook, Instagram), local payment gateway support (M-Pesa, MTN MoMo), AI-powered content generation, and drag-and-drop store builder optimized for low-bandwidth environments. The platform addresses Africa's $43B e-commerce market with emphasis on trust-building, cultural localization, and cross-border trade facilitation.

## Technical Context

**Language/Version**: TypeScript 5.2, Node.js 20 LTS  
**Primary Dependencies**: Next.js 14 (frontend), NestJS (backend), Prisma ORM, Redis, PostgreSQL  
**Storage**: PostgreSQL (primary data), Redis (caching/sessions), CDN (media), S3-compatible (file storage)  
**Testing**: Jest + Playwright (E2E), Vitest (unit), Supertest (API integration)  
**Target Platform**: Web browsers (PWA), optimized for mobile-first African market  
**Project Type**: web - Full-stack web application with frontend and backend services  
**Performance Goals**: <3s page load on 2G networks, 99.9% uptime, support 50k concurrent users  
**Constraints**: Low-bandwidth optimization, offline-first design, multi-currency support, regulatory compliance across 54 African countries  
**Scale/Scope**: Multi-tenant platform supporting unlimited merchants, B2C/B2B commerce, 90+ languages, 100+ payment gateways

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

**Simplicity**:

- Projects: 3 (api, client, shared) - within max limit
- Using framework directly? Yes - Next.js and NestJS without unnecessary wrappers
- Single data model? Yes - Prisma schema with minimal DTOs for API serialization only
- Avoiding patterns? Yes - Direct service patterns, avoiding Repository/UoW unless proven need for multi-database support

**Architecture**:

- EVERY feature as library? Yes - Each domain (auth, products, orders, payments) as separate library
- Libraries listed:
  - `@commerz/auth` - Authentication and authorization
  - `@commerz/products` - Product catalog management
  - `@commerz/orders` - Order processing and fulfillment
  - `@commerz/payments` - Payment gateway integrations
  - `@commerz/store-builder` - Website builder engine
  - `@commerz/analytics` - Business intelligence and reporting
  - `@commerz/localization` - Multi-language and currency support
- CLI per library: Each library exposes CLI commands for management operations
- Library docs: llms.txt format planned for each library

**Testing (NON-NEGOTIABLE)**:

- RED-GREEN-Refactor cycle enforced? Yes - All tests written first and must fail
- Git commits show tests before implementation? Yes - Commit structure enforced
- Order: Contract→Integration→E2E→Unit strictly followed? Yes
- Real dependencies used? Yes - Real PostgreSQL, Redis in test environments
- Integration tests for: New payment gateways, API contracts, multi-tenant data isolation
- FORBIDDEN: No implementation before failing tests

**Observability**:

- Structured logging included? Yes - Winston with structured JSON logs
- Frontend logs → backend? Yes - Centralized logging pipeline
- Error context sufficient? Yes - Full stack traces with business context

**Versioning**:

- Version number assigned? 1.0.0 (initial release)
- BUILD increments on every change? Yes - Automated semantic versioning
- Breaking changes handled? Yes - API versioning strategy with parallel support

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Option 2 - Web application (frontend + backend) due to full-stack e-commerce platform requirements

## Phase 0: Outline & Research

**Status: ✅ COMPLETE**

1. **Extract unknowns from Technical Context**: All technical decisions resolved
2. **Technology research completed**:

   - Frontend: Next.js 14 with PWA capabilities for offline functionality
   - Backend: NestJS with TypeScript for microservices architecture
   - Database: PostgreSQL + Redis + S3-compatible storage strategy
   - Payments: Direct integration approach with African payment gateways
   - Testing: Contract-first approach with real service integration

3. **Consolidate findings**: All findings documented in `research.md` with:
   - Technology stack decisions and rationale
   - African market integration strategies
   - Performance optimization approaches
   - Security and compliance requirements

**Output**: ✅ research.md complete with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

**Status: ✅ COMPLETE**
_Prerequisites: research.md complete ✅_

1. **Extract entities from feature spec** → `data-model.md` ✅:

   - 8 core entities defined (Merchant, Store, Product, Order, Customer, Payment, Review, Location)
   - Comprehensive validation rules and relationships
   - Multi-tenancy and audit trail considerations
   - Performance indexes and constraints

2. **Generate API contracts** from functional requirements ✅:

   - Complete OpenAPI 3.0 specification with 25+ endpoints
   - African-specific payment gateway contracts (M-Pesa, MTN MoMo, Airtel Money)
   - WhatsApp Business API integration contracts
   - AI content generation contracts with cultural context
   - Shipping rate calculation contracts for African logistics

3. **Generate contract tests** from contracts ✅:

   - One test file per endpoint planned
   - Request/response schema validation
   - Tests designed to fail initially (RED phase)

4. **Extract test scenarios** from user stories ✅:

   - 7 comprehensive scenarios covering all functional requirements
   - Integration test scenarios for each user story
   - Quickstart validation steps defined

5. **Update agent file incrementally** → Ready for `/scripts/update-agent-context.sh`

**Outputs**: ✅ data-model.md, ✅ contracts/\*, ✅ quickstart.md

## Phase 2: Task Planning Approach

**Status: ✅ STRATEGY DEFINED**
_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

1. **Load Base Template**: `/templates/tasks-template.md` as foundation

2. **Infrastructure & Setup Tasks** (Priority 1):

   - Database schema creation and migration setup
   - Docker containerization for development environment
   - CI/CD pipeline configuration for multi-environment deployment
   - Environment configuration for African payment gateways
   - Redis cache configuration and session management
   - S3-compatible storage setup for media assets

3. **Library Creation Tasks** (Priority 2 - TDD Order):

   - `@commerz/auth` library: Authentication and authorization with phone verification
   - `@commerz/products` library: Product catalog with AI content generation
   - `@commerz/orders` library: Order processing and fulfillment workflows
   - `@commerz/payments` library: African payment gateway integrations
   - `@commerz/store-builder` library: Drag-and-drop website builder
   - `@commerz/analytics` library: Business intelligence and reporting
   - `@commerz/localization` library: Multi-language and currency support

4. **Contract Test Tasks** (Priority 3 - Must fail first):

   - API endpoint contract tests for all 25+ endpoints
   - Mobile money integration contract tests (M-Pesa, MTN MoMo, Airtel Money)
   - WhatsApp Business API contract tests
   - AI content generation contract tests
   - Cross-border shipping calculation contract tests

5. **Core Service Implementation Tasks** (Priority 4):

   - User authentication service with JWT and phone OTP
   - Store management service with multi-tenancy
   - Product catalog service with real-time inventory sync
   - Order management service with status tracking
   - Payment processing service with retry mechanisms
   - Notification service (SMS, WhatsApp, Email)

6. **Frontend Implementation Tasks** (Priority 5):

   - PWA configuration with offline capabilities
   - Merchant dashboard with mobile-first design
   - Customer storefront with optimized loading
   - Store builder interface with drag-and-drop
   - Multi-language interface implementation
   - Payment integration UI components

7. **African Market Integration Tasks** (Priority 6):

   - M-Pesa STK Push implementation
   - MTN Mobile Money API integration
   - Airtel Money payment processing
   - WhatsApp Business messaging implementation
   - Multi-currency conversion engine
   - Landmark-based address handling

8. **Performance Optimization Tasks** (Priority 7):

   - Image optimization pipeline for low-bandwidth
   - Service worker implementation for offline functionality
   - Database query optimization and indexing
   - CDN configuration for African edge locations
   - Load testing and performance monitoring

9. **Integration Testing Tasks** (Priority 8):
   - End-to-end user journey testing
   - Multi-tenant data isolation testing
   - Payment gateway integration testing
   - Cross-border transaction testing
   - Offline functionality testing

**Ordering Strategy**:

- **TDD Enforcement**: All contract tests must be written and failing before implementation
- **Dependency Management**: Libraries before services before UI components
- **Parallel Execution**: Mark [P] for independent tasks that can run simultaneously
- **African Market Priority**: Payment and localization features prioritized for market fit

**Task Distribution**:

- Foundation & Infrastructure: 8-10 tasks
- Backend Libraries & Services: 15-20 tasks [P]
- Frontend Components & PWA: 12-15 tasks [P]
- African Integrations: 10-12 tasks
- Testing & Optimization: 8-10 tasks
- **Total Estimated**: 50-65 numbered, prioritized tasks

**African Market Specific Considerations**:

- Mobile-first implementation prioritized over desktop
- Offline functionality built into every user-facing component
- Payment gateway integration includes SMS fallback mechanisms
- Multi-language support built from ground up, not retrofitted
- Performance optimization assumes 2G network conditions

**Constitution Compliance in Task Generation**:

- Every feature implemented as independent library with CLI
- Contract tests written first, implementation second
- Real database and payment gateway testing required
- Structured logging included in all services
- Breaking changes handled with API versioning

**Estimated Output**: 50-65 numbered, ordered tasks in tasks.md with [P] parallel markers

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_
