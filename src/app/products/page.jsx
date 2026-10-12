"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [deletingIds, setDeletingIds] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);

  function handleAddToCart(product) {
    addToCart(product);
    setAddedProductId(product.id);
    window.setTimeout(() => setAddedProductId(null), 1200);
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setListError("პროდუქტების ჩატვირთვა ვერ მოხერხდა. სცადეთ მოგვიანებით.");
        setLoading(false);
      });
  }, []);

  async function handleDelete(productId) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setDeletingIds((ids) => [...ids, productId]);
    setActionError(null);

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId),
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      setActionError("პროდუქტის წაშლა ვერ მოხერხდა. სცადეთ მოგვიანებით.");
    } finally {
      setDeletingIds((ids) => ids.filter((id) => id !== productId));
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F1F5F1]">
        <p className="text-lg font-semibold text-gray-600">იტვირთება პროდუქტები...</p>
      </div>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#F1F5F1] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#53765E]">
            Find your next favorite
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Browse our collection and find something you love.
          </p>
        </div>
        {listError && (
          <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {listError}
          </p>
        )}
        {actionError && (
          <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {actionError}
          </p>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => {
            const rating = product.rating?.rate ?? 0;
            const isDeleting = deletingIds.includes(product.id);

            return (
              <article
                key={product.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[#DCE7DD] bg-white p-3 shadow-[0_4px_18px_rgba(29,73,56,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B8CFBC] hover:shadow-[0_16px_32px_rgba(29,73,56,0.12)]"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#F0F5EF] to-[#E4EDE4] p-5 sm:h-44">
                  <Link
                    href={`/products/details/${product.id}`}
                    aria-label={`View details for ${product.title}`}
                    className="flex h-full w-full items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315D42]"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute right-2 top-2 flex gap-1.5">
                    <Link
                      href={`/products/details/${product.id}`}
                      aria-label={`View details for ${product.title}`}
                      title="View product details"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white hover:text-[#315D42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315D42]"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"
                        />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                  <p className="mb-2 w-fit max-w-full truncate rounded-full bg-[#EAF1E9] px-2.5 py-1 text-[10px] font-semibold capitalize tracking-wide text-[#53765E]">
                    {product.category}
                  </p>
                  <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800">
                    <Link
                      href={`/products/details/${product.id}`}
                      className="transition-colors hover:text-[#315D42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315D42]"
                    >
                      {product.title}
                    </Link>
                  </h2>
                  <div className="mt-3 flex min-h-5 items-center gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-xs">
                      <span
                        className="whitespace-nowrap tracking-[0.08em] text-amber-500"
                        aria-label={`Rated ${rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={
                              index < Math.round(rating) ? "" : "text-slate-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </span>
                      <span className="truncate text-slate-400">
                        {product.rating?.count ?? 0} reviews
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#EAF0E9] pt-4">
                    <p className="shrink-0 text-xl font-bold tracking-tight text-[#254B38]">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.title} to cart`}
                        title={addedProductId === product.id ? "Added to cart" : "Add to Cart"}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm shadow-[#1D4938]/15 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315D42] active:translate-y-0 active:scale-[0.98] ${
                          addedProductId === product.id
                            ? "bg-[#1D4938]"
                            : "bg-[#4C7A5A] hover:bg-[#1D4938]"
                        }`}
                      >
                        {addedProductId === product.id ? (
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-[18px] w-[18px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 4h2l2.2 10.3a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6"
                            />
                            <circle cx="10" cy="19" r="1" />
                            <circle cx="18" cy="19" r="1" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        disabled={isDeleting}
                        aria-label={`Delete ${product.title}`}
                        title={isDeleting ? "Deleting..." : "Delete product"}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE7DD] bg-[#F6F8F5] text-[#718174] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-wait disabled:opacity-60"
                      >
                        {isDeleting ? (
                          <span className="text-[10px] font-semibold">...</span>
                        ) : (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}