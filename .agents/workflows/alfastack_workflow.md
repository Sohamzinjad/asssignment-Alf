---
description: How to run and work with the AlfaStack Landing Page
---
# AlfaStack Landing Page Workflow

Welcome to the AlfaStack Next.js Landing Page! This document provides a quick overview of how to interact with the project repository, run the development server, and understand the core structure.

## 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)

## 2. Running Local Development

To run the application locally on your machine, follow these steps:

1. Open a terminal and navigate to the project directory:
```bash
cd /Users/sohamzinjad/Documents/projects/asssignments/alfastack
```

// turbo
2. Install any missing dependencies (if this is your first time cloning):
```bash
npm install
```

// turbo
3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`. You should see the sleek, animated landing page.

## 3. Project Structure Overview

The project follows a standard Next.js 14 App Router pattern:

- `src/app/page.tsx`: The main landing page assembling all components.
- `src/app/layout.tsx`: The root layout. This handles the Next.js HTML/Body setup, imports global Tailwind CSS, and wraps the app in the global smooth scroller (`SmoothScroll.tsx`).
- `src/app/globals.css`: Contains custom Tailwind v4 configuration, including custom glowing CSS classes and variables.
- `src/components/sections/`: Contains the modular UI sections:
    - `Hero.tsx`: The Hero section highlighting custom text stagger animations via GSAP.
    - `WhoWeAre.tsx`: The pinned horizontal-scrolling section.
    - `Transformation.tsx`: The timeline with SVG paths drawing on-scroll.
    - `TechStack.tsx`: The capabilities grid featuring Framer Motion spotlight hover effects.
    - `Contact.tsx`: Cyberpunk-styled contact form.
- `src/app/api/contact/route.ts`: A mock backend API that handles the `/api/contact` POST request.

## 4. Building for Production

To create an optimized production build, run:
```bash
cd /Users/sohamzinjad/Documents/projects/asssignments/alfastack
npm run build
```

This will run TypeScript checks and compile the application. You can then test the production build locally via:
```bash
npm run start
```
