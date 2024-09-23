import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] p-2">
          <h2 className="text-[#c0a062] text-lg font-bold">Page not found</h2>
          <div className="h-px bg-[#c0a062] opacity-50 mt-1"></div>
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-lg text-gray-text text-[#c0a062]">
            Error 404, page not found ☹️
          </h2>
          <Link href="/">
            <Button className="text-[#c0a062]">Return</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
