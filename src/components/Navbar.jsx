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
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#163B2D] via-[#1D4938] to-[#24543F] px-4 shadow-lg shadow-[#163B2D]/10"
    >
      <div className="mx-auto flex min-h-[76px] max-w-6xl flex-wrap items-center justify-between gap-3 px-1 py-3 md:px-2">
        <Link
          href="/products"
          aria-label="My Store home"
          className="group flex items-center gap-3 rounded-xl px-1 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCE9DF] text-[#1D4938] shadow-md shadow-black/10 transition duration-200 group-hover:-rotate-3 group-hover:scale-105">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8.5h14l-1 12H6l-1-12Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V6a3 3 0 0 1 6 0v3" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5c1.8-2.2 4.2-2.2 6 0" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[22px] font-extrabold tracking-tight text-white sm:text-2xl">
              My<span className="text-[#B9D7BF]">Store</span>
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Everyday essentials
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:text-base"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 10 2-6h14l2 6M4 10v10h16V10M3 10h18M9 20v-6h6v6" />
            </svg>
            Products
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:text-base"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#DCE9DF] px-1.5 py-1 text-[10px] font-extrabold leading-none text-[#1D4938] ring-2 ring-[#1D4938]">
                {totalQuantity}
              </span>
            )}
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Open account menu"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              title="Account menu"
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-[#E8F1E9] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#DCE9DF]/70 hover:bg-[#DCE9DF] hover:text-[#1D4938] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                <circle cx="12" cy="8" r="3.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 20a7 7 0 0 1 14 0" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#D4E2D6] bg-white p-2 text-slate-800 shadow-xl shadow-[#163B2D]/20 ring-1 ring-black/5">
                <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#66816D]">
                  Your account
                </p>
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[#EDF4EE] hover:text-[#1D4938]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-[#53765E]">
                    <circle cx="12" cy="8" r="3.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 20a7 7 0 0 1 14 0" />
                  </svg>
                  Profile
                </Link>
                <Link
                  href="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[#EDF4EE] hover:text-[#1D4938]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-[#53765E]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5M15 12H3m9-8h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                  </svg>
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[#EDF4EE] hover:text-[#1D4938]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-[#53765E]">
                    <circle cx="9" cy="8" r="3.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 20a6.5 6.5 0 0 1 13 0m3-11v6m-3-3h6" />
                  </svg>
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