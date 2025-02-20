"use client";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import UserButton from "../auth/user-button";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 h-[100px] flex items-center justify-between sticky top-0 z-50  px-5">
      <Link href="/" className="hidden md:block">
        <div className="flex items-center space-x-1 text-orange-500">
          <h1 className="text-3xl font-bold text-white hidden md:block">
            Logo
          </h1>
        </div>
      </Link>

      {/* Right side buttons */}
      <div className="flex items-center space-x-8">
        <UserButton />
      </div>
    </nav>
  );
}
