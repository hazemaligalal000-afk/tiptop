# TipTop - Vendor Intelligence Platform 🚀

TipTop is an enterprise-grade B2B SaaS platform designed to modernize the vendor prequalification process. It replaces traditional excel sheets and emails with a centralized, digital, API-first ecosystem.

## 🌟 Key Features

1. **Vendor Prequalification Wizard (PQQ):** A comprehensive 6-step multi-form with fluid animations handling company info, organization, technical capabilities, project experience, quality compliance, and capacity constraints.
2. **Vendor Quality Index (VQI) Engine:** An automated algorithmic scoring system that evaluates vendors based on their inputs and assigns them a quality badge (Excellent, High, Medium, Low).
3. **Smart Vendor Search:** A dynamic dashboard for clients to explore vendors, filter by technical discipline, GMP experience, and VQI scores.
4. **Side-by-Side Comparisons:** Dynamic tool to evaluate top vendors directly against each other.
5. **Secure Authentication:** Integrated with Supabase Auth with fully protected routes (Middleware).
6. **Robust Database Integration:** Connected to a PostgreSQL database via Prisma ORM for relational data storage.

## 🛠️ Tech Stack

* **Framework:** Next.js 16.2.10 (App Router, Server Components)
* **Styling:** Tailwind CSS v4, Lucide React Icons
* **State Management:** Zustand (Multi-step form persistence)
* **Animations:** Framer Motion
* **Database & ORM:** PostgreSQL (Supabase Pooler), Prisma v7
* **Authentication:** Supabase SSR (@supabase/ssr)

## 📦 Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* A Supabase Project with connection pooler enabled

### Setup Instructions

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Ensure your `.env` file is configured with your Supabase credentials:
   ```env
   DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   ```

3. **Database Migration:**
   Sync the Prisma schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   
5. **Access the Platform:**
   Open `http://localhost:1829` (Custom port configured in package.json)

## 📁 Project Structure

* `/src/app`: Next.js App Router (Dashboard, Search, Auth, API Routes).
* `/src/features/pqq`: The core domain logic for the Vendor PQQ Wizard (Zustand store, step components).
* `/src/components`: Shared layout elements (Sidebar, TopNav).
* `/src/lib`: Singletons and client configurations (Prisma, Supabase).
* `/prisma/schema.prisma`: The PostgreSQL database schema definition.

## 🔐 Architecture Notes
* **Route Protection:** Handled at the edge via `src/middleware.ts` using Supabase SSR cookies.
* **Prisma Singleton:** Prisma Client v7 is instantiated via `src/lib/prisma.ts` to prevent connection leaks during development and support Next.js server actions.
