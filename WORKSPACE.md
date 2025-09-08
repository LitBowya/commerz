# Monorepo Workspace Configuration

This project uses npm workspaces for monorepo management.

## Structure

```
commerz/
├── frontend/          # Next.js 15 frontend
├── backend/           # NestJS backend  
├── packages/
│   └── @commerz/      # Shared libraries
└── docker-compose.yml # Development services
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development services:
```bash
npm run docker:up
```

3. Start development servers:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier
- `npm run type-check` - Type check all TypeScript

## Database

- PostgreSQL on port 5432
- Redis on port 6379
- pgAdmin on port 8080 (admin@commerz.dev / admin123)

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```
