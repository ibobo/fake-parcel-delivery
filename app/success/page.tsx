"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const signatureRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Load and display signature
    const signatureData = localStorage.getItem('lastSignature');
    if (signatureData && signatureRef.current) {
      signatureRef.current.src = signatureData;
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center">
        <img
          ref={signatureRef}
          className="w-auto flex-auto object-contain mix-blend-overlay invert"
          alt="Signature"
        />
      <div className="py-6">
        <Link
          href="/"
          className="bg-white text-3xl font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 relative overflow-hidden group block"
        >
          <span className="relative z-10 text-white transition-colors group-hover:text-purple-800">ENJOY</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </Link>
        </div>
    </div>
  );
}