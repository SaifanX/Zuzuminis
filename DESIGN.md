# Zuzu Minis: Design Specification

## 1. BRAND ESSENCE & ETHOS
- **Identity**: "Playful Premium"
- **Mood**: High-end boutique warmth, minimalist luxury, lots of whitespace.
- **Narrative**: A "Chapter-based" journey that starts with the character (The Zuzu Baby) and ends with the craftsmanship (100% Indian Cotton).

## 2. THE VISUAL LANGUAGE
### A. Color Palette
- `Background (Base)`: #FDFCF9 (Warm Ivory / Sand) - Non-negotiable. Must feel creamy and "soft-touch."
- `Primary (Zuzu Blue)`: #4A90E2 (Muted Teal) - Used for branding and high-energy focal points.
- `Secondary (Minis Pink)`: #FFB6C1 (Soft Peach) - Used for secondary text and warmth.
- `Contrast (Foreground)`: #1A1A1A (Near Black) - For statement typography and navigation.
- `Accent (Butter)`: #F5E6BE - For subtle overlays and secondary cards.

### B. Typography Stack
- **Headings (Display)**: `Searghy`.
  - *Instruction*: Use for massive, statement-making headlines. Allow for lowercase and asymmetric placement.
- **Body & Accents**: `Kiddos`.
  - *Instruction*: Use for secondary copy, captions, and labels. Must feel friendly and kid-like but readable.

## 3. CORE DESIGN PRINCIPLES
- **Weightlessness**: All elements should have a "buoyant" feel. Use generous padding (15rem+) between sections.
- **Spatial Depth**: Utilize glassmorphism (translucency + background blur) for UI elements to create layers.
- **Asymmetry**: Avoid rigid grids. Offset text and imagery to create an editorial, "magazinelike" feel.
- **Cinematic Polish**: A subtle 3% grain overlay and soft-shadow systems (Contact Shadows).

## 4. CREATIVE DIRECTIONS & REQUESTS
### Chapter 01: The Hero Experience
- **Request**: We'd love to see an immediate "Wow" factor. Perhaps a massive lowercase H1 paired with something interactive, like the glass mascot we discussed. The CTA could be clean and minimalist.

### Chapter 02: Visual Discovery
- **Request**: Think about how a user discovers the collection. A horizontal-scroll gallery or some form of cinematic image transition (like grayscale to color) could be a beautiful way to show off the fabrics.

### Chapter 03: The Brand Narrative
- **Request**: We want to build trust in our craft. We've thought about using stacking cards to highlight our values (like "Skin-Friendly Cotton"), but feel free to explore other ways to tell the Bangalore studio story.

### Chapter 04: The Boutique Shop
- **Request**: For the actual shopping experience, let's keep it high-performance and clean. Minimalist product cards with subtle, helpful actions would be great.

## 5. TECHNICAL CONSTRAINTS FOR STITCH
- **Framework**: Next.js 16 (App Router) + Tailwind CSS 4.0.
- **Animation**: GSAP (@gsap/react).
- **Backend**: Custom Convex implementation
- **Responsiveness**: Mobile-first but "Desktop-Elite" (Optimization for 4K displays).
