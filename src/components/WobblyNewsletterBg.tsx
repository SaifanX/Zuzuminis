"use client";

export function WobblyNewsletterBg() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Blue covers the full background */}
      <div className="absolute inset-0 bg-zuzu-blue" />
      {/* Pink fills the left half with a static smooth SVG wave edge */}
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ fill: "#FF66A1" }}
      >
        <path d="M 0,0 L 50,0 C 58,200 42,400 55,500 C 62,600 44,800 50,1000 L 0,1000 Z" />
      </svg>
    </div>
  );
}
