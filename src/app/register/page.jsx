"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(4, "Must be at least 4 characters")
    .max(20, "Must be no more than 20 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(4, "Must be at least 4 characters")
    .max(20, "Must be no more than 20 characters"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(13, "You must be at least 13 years old")
    .max(120, "Age must be no more than 120"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be at least 6 characters")
    .max(12, "Must be no more than 12 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Use numbers only")
    .min(10, "Must be at least 10 digits")
    .max(100, "Must be no more than 100 digits"),
});

export default function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Registration completed successfully!");
        reset();
      } else {
        setErrorMessage("An error occurred during registration.");
      }
    } catch (err) {
      setErrorMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-[#EDF4EE] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#D4E2D6] bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#53765E]">
            Account Setup
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h1>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800 border border-emerald-200">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-800 border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Age</label>
              <input
                type="text"
                inputMode="numeric"
                {...register("age", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
              />
              {errors.age && (
                <p className="mt-1 text-xs text-red-600">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input
                type="text"
                {...register("phone")}
                placeholder="Numbers only"
                className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-xl border border-[#D4E2D6] px-4 py-3 text-slate-800 shadow-sm focus:border-[#4C7A5A] focus:outline-none focus:ring-1 focus:ring-[#4C7A5A]"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#4C7A5A] px-6 py-3 font-semibold text-white transition hover:bg-[#315D42] focus:outline-none focus:ring-2 focus:ring-[#315D42] focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}