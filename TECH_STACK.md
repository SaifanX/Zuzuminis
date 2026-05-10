# Zuzu Minis: Technical Architecture

## 1. Frontend: Next.js (App Router)
*   **Language**: TypeScript for type-safety.
*   **Styling**: Tailwind CSS (Latest) for rapid, bespoke UI development.
*   **Animations**: GSAP (`@gsap/react`) for high-performance, cinematic scroll-triggered reveals.
*   **Icons**: Lucide React.
*   **Components**: Custom-built from scratch to avoid template bloat.

## 2. Backend: Convex
*   **Type**: Real-time Document Database.
*   **Purpose**: Handles product inventory, cart state, and order management without traditional REST overhead.
*   **Real-time**: Instant updates for stock levels and user activity.

## 3. 3D & Visuals (R3F)
*   **Framework**: React Three Fiber & Drei.
*   **Strategy**: Subtle, high-end 3D elements (Mascot, interactive product previews) to elevate the boutique experience.

## 4. Infrastructure & Deployment
*   **Frontend Hosting**: Vercel (Optimized for Next.js).
*   **Backend Hosting**: Convex Cloud.
*   **SEO**: Next.js Metadata API + Structured JSON-LD for local business visibility.
