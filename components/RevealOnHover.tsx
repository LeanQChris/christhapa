"use client";

import { useEffect, useRef } from "react";
import { BackgroundGradient } from "./ui/background-gradient";

export default function RevealOnHover() {
  const veilRef = useRef<HTMLDivElement>(null);
  const radiusRef = useRef(140);

  useEffect(() => {
    const veil = veilRef.current;
    if (!veil) return;

    function setMask(x: number, y: number) {
      if (!veil) return;
      const radius = radiusRef.current;

      // Use px for precise positioning
      veil.style.setProperty("--x", x + "px");
      veil.style.setProperty("--y", y + "px");
      veil.style.setProperty("--r", radius + "px");

      // Update the mask image (some browsers require full string rebuild)
      const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0 98%, black 100%)`;
      veil.style.webkitMaskImage = mask;
      veil.style.maskImage = mask;
    }

    // Initialize in center
    const { innerWidth, innerHeight } = window;
    setMask(innerWidth / 2, innerHeight / 2);

    // Pointer (mouse, pen) support
    const handlePointerMove = (e: PointerEvent) => {
      setMask(e.clientX, e.clientY);
    };

    // Touch support (for mobile)
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setMask(t.clientX, t.clientY);
    };

    // Optional: scroll wheel to resize the reveal circle
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let browser zoom
      radiusRef.current = Math.max(
        40,
        Math.min(400, radiusRef.current + (e.deltaY > 0 ? -10 : 10))
      );
      // Re-apply at last known position by reading current CSS vars
      const x =
        parseFloat(getComputedStyle(veil).getPropertyValue("--x")) ||
        innerWidth / 2;
      const y =
        parseFloat(getComputedStyle(veil).getPropertyValue("--y")) ||
        innerHeight / 2;
      setMask(x, y);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={veilRef}
      id="veil"
      className="reveal-mask pointer-events-none fixed inset-0 bg-black z-10"
      style={{
        ["--x" as string]: "50%",
        ["--y" as string]: "50%",
        ["--r" as string]: "120px",
      }}
    />
  );
}
