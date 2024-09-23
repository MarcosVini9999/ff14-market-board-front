import { LoaderCircle } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] p-2">
          <h2 className="text-[#c0a062] text-lg font-bold">Loading...</h2>
          <div className="h-px bg-[#c0a062] opacity-50 mt-1"></div>
        </div>
        <div className="flex items-center justify-center p-4">
          <LoaderCircle className="h-8 w-8 animate-spin text-[#c0a062]" />
        </div>
      </div>
    </div>
  );
}
