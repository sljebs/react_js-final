"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
}).required();

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Remember me / Auto-login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/profile");
    }
  }, [router]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        if (data.rememberMe) {
          localStorage.setItem("token", result.token);
        } else {
          sessionStorage.setItem("token", result.token);
        }
        router.push("/profile");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-[#EDF4EE] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#D4E2D6] bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#53765E]">
            Welcome Back
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Log In
          </h1>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="e.g. johnd"
              className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="e.g. m38rmF$"
              className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm text-slate-700">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2 rounded border-[#D4E2D6] text-[#4C7A5A] focus:ring-[#4C7A5A]"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#4C7A5A] px-6 py-3 font-semibold text-white transition hover:bg-[#315D42] focus:outline-none focus:ring-2 focus:ring-[#315D42] focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}