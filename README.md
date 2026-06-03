# Task Manager – Adool Construct & Designs Ltd Assessment

A production‑grade CRUD task management web application built with
**Next.js 16 (App Router)**, **Auth.js v5**, **Prisma ORM**, and **SQLite**.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started (from ZIP)](#getting-started-from-zip)
4. [Getting Started (from GitHub)](#getting-started-from-github-optional)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Running the App](#running-the-app)
8. [Project Structure](#project-structure)
9. [Design Choices & Trade‑offs](#design-choices--trade-offs)

---

## Features

- User authentication (sign‑up, sign‑in, sign‑out) with **credentials provider**
- Protected routes via **Next.js 16 middleware (proxy.ts)**
- Full **CRUD** operations on tasks (create, read, update, delete)
- Task status tracking: `Pending`, `In Progress`, `Completed`
- Dashboard with real‑time task statistics
- Responsive, clean UI built with **shadcn/ui** and **Tailwind CSS**
- Client‑side data fetching with **TanStack React Query**
- Zod validation on both client and server

---

## Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Framework        | Next.js 16 (App Router)  |
| Authentication   | Auth.js v5 (Credentials) |
| Database         | SQLite (via Prisma ORM)  |
| Validation       | Zod                      |
| Styling          | Tailwind CSS, shadcn/ui  |
| Icons            | Lucide React             |
| State management | TanStack React Query     |
| Type safety      | TypeScript               |

---

## Getting Started (from ZIP)

1. **Extract the ZIP file**

```bash
unzip adool-construct-assessment.zip
cd adool-construct-assessment
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

   - Copy .env.example to .env.local and fill in the required values
   - (see Environment Variables).

4. **Set up the database (see Database Setup)**

5. **Generate auth secret**

```bash
npx auth secret
```

- Copy secret to .env.local AUTH_SECRET=secret

6. **Run the development server**

```bash
pnpm dev
```

- The app will be available at http://localhost:3000.

## Getting Started (from GitHub, optional)

1. **Clone the repository**

```bash
git clone <repo-url>
cd adool-construct-assessment
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

   - Copy .env.example to .env.local and fill in the required values
   - (see Environment Variables).

4. **Set up the database (see Database Setup)**

5. **Generate auth secret**

```bash
npx auth secret
```

- Copy secret to .env.local AUTH_SECRET=secret

6. **Run the development server**

```bash
pnpm dev
```

- The app will be available at http://localhost:3000.

## Environment Variables

Create a `.env.local` file in the project root.  
All required variables are listed in `.env.example`.

| Variable     | Description                | Example                         |
| ------------ | -------------------------- | ------------------------------- |
| DATABASE_URL | SQLite connection string   | file:./prisma/dev.db            |
| AUTH_SECRET  | Secret key for JWT signing | secret key from npx auth secret |

> **Important:** Never commit `.env.local` to version control.

## Database Setup

This project uses Prisma with SQLite. No external database server is required.

1. **initialize Prisma:**

```bash
pnpm prisma migrate dev

```

2. **Sync the Prisma schema to your SQLite database:**

```bash
npx prisma init

```

2. **Generate the type‑safe Prisma client (also done automatically after migrate dev):**

```bash
pnpm prisma generate
```

- The database file (dev.db) will be created inside the prisma/ folder.

## Running the App

Start the development server:

```bash
pnpm dev
```

Then:

- Open http://localhost:3000
- Sign up via `/signup`
- Sign in via `/login` (or you’ll be redirected there automatically)
- Manage tasks on the dashboard (home page `/`)

## Project Structure

adool-construct-assessment/
├── app/
│ ├── (auth)/
│ │ ├── login/page.tsx
│ │ └── signup/page.tsx
│ ├── api/
│ │ ├── auth/[...nextauth]/route.ts # Auth.js catch‑all
│ │ ├── users/signup/route.ts # POST /api/users/signup
│ │ ├── users/signin/route.ts # POST /api/users/signin
│ │ ├── tasks/
│ │ │ ├── route.ts # GET (list) & POST (create)
│ │ │ └── [id]/route.ts # GET, PATCH, DELETE
│ │ └── dashboard/stats/route.ts # GET stats
│ ├── page.tsx # Dashboard (home)
│ └── providers.tsx # SessionProvider wrapper
├── components/
│ ├── ui/ # shadcn/ui primitives
│ ├── icons/ # Custom icons
│ │ ├── ArrowDown.tsx
│ │ ├── PendingClipboard.tsx
│ │ └── index.ts
│ ├── layout/
│ │ └── Header.tsx
│ ├── tasks/
│ │ ├── TaskDialog.tsx # Create/Edit dialog
│ │ └── ShowTaskDialog.tsx # Read‑only task view
│ ├── DashboardPageContent.tsx
│ └── Loader.tsx
├── lib/
│ ├── hooks/
│ │ ├── useAuth.ts
│ │ ├── useDashboard.ts
│ │ └── useTasks.ts
│ |── schema/
│ | └── authSchema.ts
│ | └── taskSchema.ts
│ ├── services/
│ │ ├── auth.service.ts
│ │ ├── task.service.ts
│ │ └── dashboard.service.ts
│ ├── prisma.ts # Singleton Prisma client
│ ├── query-client.ts
│ ├── utils.ts
├── prisma/
│ └── schema.prisma
├── prisma.config.ts # Prisma configuration (root)
├── proxy.ts # Next.js 16 middleware
├── auth.ts # Auth.js configuration
├── .env.local
└── README.md

## Design Choices & Trade-offs

### 1. SQLite over PostgreSQL

**Choice:** SQLite for local development.  
**Trade-off:** Zero external dependencies, instant setup — ideal for an assessment. In production, PostgreSQL (or similar) would be used with connection pooling.

---

### 2. Credentials Auth (not OAuth)

**Choice:** JWT-based credentials provider.  
**Trade-off:** Simpler for a demo, no third-party services required. In production, OAuth (Google, GitHub) plus credentials fallback provides better UX and security.

---

### 3. Client-side sign-out

**Choice:** Sign-out is handled entirely on the client via `next-auth/react`’s `signOut()` function, which clears the session cookie.  
**Trade-off:** No custom API route required, simplifying the codebase. This is also the standard approach in most NextAuth setups.

---

### 4. API Routes + Service Layer

**Choice:** RESTful API routes inside `app/api/`, consumed via a thin service layer and React Query hooks.  
**Trade-off:** Slightly more boilerplate than Server Actions, but provides clear separation of concerns and scales well in larger apps.

---

### 5. No Refresh Tokens

**Choice:** JWT sessions with a fixed `maxAge` (7 days).  
**Trade-off:** Users must re-authenticate after expiry. Acceptable for a credentials-based demo app; production OAuth flows typically use refresh tokens.

---

### 6. React Query for Client State

**Choice:** All server state handled via React Query.  
**Trade-off:** Adds a dependency, but provides caching, background refetching, and a strong developer experience.

---

### 7. Middleware for Route Protection (now Proxy in Next.js 16)

**Choice:** `proxy.ts` (Next.js middleware) handles authentication checks and redirects.  
**Trade-off:** Every request goes through middleware, but it prevents unauthorized page access and keeps page logic clean.

---

### 8. Partial Update Endpoint

**Choice:** Single `PATCH /api/tasks/:id` endpoint for all updates (status, title, etc.).  
**Trade-off:** Frontend must manage payloads carefully, but it avoids endpoint sprawl and keeps the API simple.

## Video Walkthrough

A video demonstrating the full flow (sign‑up, sign‑in, CRUD operations, code structure) is available at the link provided in the submission email.
