# Gomdol Vintage Shop Platform

Monorepo scaffold for the Gomdol vintage clothing ecommerce experience. The project follows the provided PRD and includes a Spring Boot backend and a React (Vite) frontend.

## Project Layout

```
.
├── backend/    # Spring Boot 3.2 (Java 21) service
└── frontend/   # React 18 + Vite client
```

---

## Backend

- Java 21, Spring Boot 3.2, Gradle build configured with Web, Security, JPA, Validation, OAuth2 Client, and JWT (jjwt).
- Entities for `Product`, `Review`, `UserAccount`, `PurchaseOrder`, and `VisitLog` plus repositories and service interfaces.
- REST controllers mapped to the PRD endpoints with placeholder implementations where business logic is still pending.
- Session login + OAuth entry points scaffolded in `SecurityConfig` with password encoder, custom `UserDetailsService`, and JWT helpers ready for integration.
- `application.yml` contains starter configuration for PostgreSQL, OAuth providers, and JWT.

### Running the backend

Add a Gradle wrapper (`gradle wrapper`) or use a local Gradle 8.x installation, then:

```bash
cd backend
./gradlew bootRun
```

Populate environment secrets (DB, OAuth, JWT secret) before running in production.

---

## Frontend

- React 18 application bootstrapped for Vite with React Router, Axios, and styled-components.
- Routing skeleton for public product browsing, user cart/orders, and admin dashboard/product editor flows.
- API client modules wired to the backend endpoints with JWT injection from `localStorage`.
- Placeholder pages/components that gracefully fallback until real APIs are connected.

### Running the frontend

Install dependencies and start the development server:

```bash
cd frontend
npm install
npm run dev
```

Vite proxy forwards `/api` requests to the backend on `localhost:8080`.

---

## Next Steps

1. Implement business logic inside the service layers (reviews, orders, auth, stats) and add proper DTO mapping.
2. Extend security with session handling, JWT issuance on social login, and role-based guards for admin routes.
3. Hook up persistence for visit logging, cart/order workflows, and analytics queries.
4. Replace frontend placeholders with real data flows, add forms/validation, and integrate review CRUD.
5. Add automated tests (Spring Boot slices + React testing) and CI workflows as the code matures.
