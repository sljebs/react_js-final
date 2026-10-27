"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Redux-იდან კალათის ჯამური რაოდენობის წამოღება
  const totalQuantity = useSelector((state) => state.cart.totalQuantity) || 0;

  // მენიუს დახურვა გარე სივრცეზე დაკლიკებისას
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-white/10 bg-[#1D4938] px-4 py-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-1 py-1 md:px-2">
        <Link
          href="/products"
          aria-label="My Store home"
          className="rounded-lg px-1 py-1 text-[27px] font-bold tracking-tight text-white transition hover:text-[#DCE9DF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          My Store
        </Link>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-6">
          <Link
            href="/products"
            className="rounded-lg px-3 py-2 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg"
          >
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#DCE9DF] px-1.5 py-0.5 text-[11px] font-bold leading-none text-[#1D4938]">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Profile / Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              title="Account menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCE9DF]/70 bg-[#DCE9DF] text-[#1D4938] shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#1D4938] py-2 shadow-xl ring-1 ring-black/5">
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}