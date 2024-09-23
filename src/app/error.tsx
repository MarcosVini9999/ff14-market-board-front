"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] p-2">
          <h2 className="text-[#c0a062] text-lg font-bold">Erro</h2>
          <div className="h-px bg-[#c0a062] opacity-50 mt-1"></div>
        </div>
        <div className="p-4 flex flex-col items-center space-y-2">
          <h2 className="font-semibold text-lg text-gray-text text-[#c0a062]">
            Something went wrong ☹️
          </h2>
          <Button onClick={() => reset()} className="text-[#c0a062]">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
