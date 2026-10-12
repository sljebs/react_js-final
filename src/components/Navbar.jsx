"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

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

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 md:gap-8">
          {[
            { href: "/products", label: "Products" },
            { href: "/profile", label: "Profile" },
            { href: "/cart", label: "Cart" },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="relative rounded-lg px-3 py-2 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg"
            >
              {label}
              {label === "Cart" && itemCount > 0 && (
                <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-[#DCE9DF] px-1.5 py-0.5 text-[11px] font-bold leading-none text-[#1D4938]">
                  {itemCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}