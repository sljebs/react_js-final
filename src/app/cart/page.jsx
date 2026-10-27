"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "@/store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalAmount);

  // რაოდენობის გაზრდა (მაქსიმუმ 10)
  const handleIncrease = (id, currentQuantity) => {
    if (currentQuantity < 10) {
      dispatch(increaseQuantity(id));
    }
  };

  // რაოდენობის შემცირება (მინიმუმ 1)
  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(decreaseQuantity(id));
    }
  };

  // პროდუქტის წაშლა კალათიდან
  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#EDF4EE] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#53765E]">
              Your items
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <div className="rounded-2xl border border-[#D4E2D6] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E2EEE4] text-3xl text-[#315D42]" aria-hidden="true">
              🛒
            </div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">Your Cart is Empty</h2>
            <p className="mb-8 text-slate-600">Add a few products to get started.</p>
            <Link
              href="/products"
              className="inline-flex rounded-xl bg-[#4C7A5A] px-6 py-3 font-semibold text-white transition hover:bg-[#1D4938] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315D42]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#EDF4EE] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#53765E]">
            Your items
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Shopping Cart
          </h1>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#D4E2D6] bg-white shadow-sm" aria-label="Shopping cart items">
          <div className="hidden grid-cols-[minmax(0,1fr)_180px_120px_48px] items-center border-b border-[#D4E2D6] bg-[#DDEADE] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#506657] sm:grid">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Price</span>
            <span aria-hidden="true" />
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="relative grid grid-cols-1 items-center gap-5 border-b border-[#E2ECE3] px-5 py-6 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_180px_120px_48px] sm:px-8 sm:py-7"
            >
              <div className="flex min-w-0 items-center gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#EDF4EE] p-2 sm:h-28 sm:w-28">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="112"
                    height="112"
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="line-clamp-2 font-semibold leading-6 text-slate-800">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    ${Number(item.price).toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-center sm:gap-3">
                <span className="text-sm font-medium text-slate-500 sm:hidden">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    −
                  </button>
                  <span className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-[#D4E2D6] bg-white px-3 text-lg font-medium text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    disabled={item.quantity >= 10}
                    aria-label={`Increase quantity of ${item.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end">
                <span className="text-sm font-medium text-slate-500 sm:hidden">Price</span>
                <span className="font-semibold tabular-nums text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.title} from cart`}
                className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:static sm:justify-self-end"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" />
                </svg>
              </button>
            </div>
          ))}

          <div className="flex flex-col gap-4 bg-[#DDEADE] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link href="/products" className="text-sm font-semibold text-[#315D42] transition hover:text-[#1D4938] hover:underline">
              Continue shopping
            </Link>
            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <span className="font-medium text-slate-600">
                Total ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
              <span className="text-2xl font-bold tabular-nums text-slate-900">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}