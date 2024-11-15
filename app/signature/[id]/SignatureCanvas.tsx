"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignatureCanvas() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvas.parentElement?.offsetWidth ?? 100;
    canvas.height = canvas.parentElement?.offsetHeight ?? 100;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      setContext(ctx);
    }
  }, []);

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDrawing(true);
    if (!context) return;

    const { offsetX, offsetY } = getCoordinates(e);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing || !context) return;

    const { offsetX, offsetY } = getCoordinates(e);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoordinates = (e: React.TouchEvent | React.MouseEvent) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    } else {
      return {
        offsetX: (e as React.MouseEvent).clientX - rect.left,
        offsetY: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const handleSign = () => {
    if (canvasRef.current) {
      const signatureData = canvasRef.current.toDataURL();
      localStorage.setItem("lastSignature", signatureData);
      router.push("/success");
    }
  };

  return (
    <>
      <div className="flex-1 bg-white rounded-lg shadow-sm mb-4 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <button
        onClick={handleSign}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center"
      >
        Firma
      </button>
    </>
  );
}
