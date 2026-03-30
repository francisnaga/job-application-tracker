# Vantage

A minimalist, high-fidelity career dashboard for tracking applications and managing your professional search. Built with a focus on speed, clarity, and premium UI.

## 🛠 Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://framer.com/motion)
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ Key Features
- **Application Tracking**: Manage your job hunt with a clean, low-latency interface.
- **Analytics**: Visualize your search progress through status breakdowns and monthly activity trends.
- **Document Hub**: Central storage for resumes and portfolio links.
- **Identity Console**: Quick-edit professional profile for salary targets and summaries.
- **Mobile Optimized**: Zero-zoom input fields and gesture-optimized layouts for iOS/Safari.

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env.local` file with your credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Local Setup
```bash
npm install
npm run dev
```

## 🏗 Architecture Priorities
- **Server-First**: Heavy lifting done in Next.js Server Components to minimize client-side bundle size.
- **Visual Performance**: Custom-built loading states (`loading.tsx`) and skeletal animations for perceived zero-latency.
- **Secure by Default**: All data access is hardened through Supabase Row Level Security (RLS).

---
**Vantage** — *Simplify your career search.*
