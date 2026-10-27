"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id || "1";

  const [result, setResult] = useState({
    id: null,
    product: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setResult({ id, product: data?.id ? data : null, error: null });
        }
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        if (!cancelled) {
          setResult({
            id,
            product: null,
            error: "პროდუქტის ჩატვირთვა ვერ მოხერხდა. სცადეთ მოგვიანებით.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const loading = result.id !== id;
  const product = loading ? null : result.product;
  const error = loading ? null : result.error;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl font-semibold text-gray-600">იტვირთება დეტალები...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-xl text-red-500">{error}</p>
        <Link
          href="/products"
          className="mt-6 inline-block font-medium text-[#315D42] hover:underline"
        >
          &larr; უკან პროდუქტებში
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-500">პროდუქტი ვერ მოიძებნა.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-[#F1F5F1] px-6 py-12">
      <div className="mx-auto max-w-5xl">
      <Link
        href="/products"
        className="inline-block mb-8 text-[#315D42] hover:underline font-medium"
      >
        &larr; უკან პროდუქტებში
      </Link>

      <div className="flex flex-col items-center gap-10 rounded-3xl border border-[#DCE7DD] bg-white p-8 shadow-[0_12px_36px_rgba(29,73,56,0.08)] md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-contain"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#53765E] bg-[#EAF1E9] px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-3">
              {product.title}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-extrabold text-[#254B38]">
                ${product.price}
              </span>
              {product.rating && (
                <div className="text-sm text-gray-600 bg-[#F1F5F1] px-3 py-1.5 rounded-lg border border-[#DCE7DD]">
                  ⭐ <span className="font-bold text-gray-700">{product.rating.rate}</span> ({product.rating.count} რეიტინგი)
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="w-full rounded-xl bg-[#4C7A5A] px-6 py-3 font-medium text-white transition hover:bg-[#1D4938] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315D42]"
          >
            Add to Cart
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}