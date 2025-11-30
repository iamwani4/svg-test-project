# Client Management System – Frontend

**Technical Assessment for Sensia Ventures Group**
Author: Wakil Niazi
Email: contact@wani4.com
**Important Disclaimer**  
This frontend was developed under a strict time constraint as part of a technical assessment.  
Some features are intentionally simplified or incomplete, including:

- **Stripe payment integration is not implemented**
- **Permission management UI is missing**

This project is **for evaluation only** and should **not** be considered production-ready or used in any real environment.

### Features Implemented (within time limit)

- Full CRUD interfaces for Products, Clients, Orders, Comments, and Users (admin only)
- Order creation with client search and split Cash/Card payments
- JWT authentication with auto-logout on 401
- Global error handling with beautiful toasts (Sonner)
- Responsive, clean UI using Ant Design 6 + Tailwind CSS
- State management with Redux Toolkit
- Type-safe, modern React 19 + TypeScript codebase

### Tech Stack

- Framework: **React 19** + **Vite**
- Language: TypeScript
- UI: Ant Design 6 + Tailwind CSS
- State: Redux Toolkit + RTK Query-style async thunks
- Routing: React Router 7
- Notifications: Sonner
- Build Tool: Vite + React Compiler (enabled)

### Setup & Running

#### Using Bun

```bash
bun install
bun run dev


# using NOde/Npm
npm install
npm run dev
```
