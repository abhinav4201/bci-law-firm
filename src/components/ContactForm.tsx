/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { useState } from "react";

export const ContactForm = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setServerMessage(result.message);
      setIsError(false);
      reset();
    } catch (error: any) {
      setServerMessage(error.message);
      setIsError(true);
    }
  };

  const getInputClass = (fieldName: keyof ContactFormValues) =>
    `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : ""
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Full Name <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='name'
          autoComplete='name' // Added for name
          {...register("name")}
          className={getInputClass("name")}
        />
        {errors.name && (
          <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          Email Address <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          id='email'
          autoComplete='email' // Added for email
          {...register("email")}
          className={getInputClass("email")}
        />
        {errors.email && (
          <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='phone'
          className='block text-sm font-medium text-gray-700'
        >
          Phone Number <span className='text-red-500'>*</span>
        </label>
        <input
          type='tel'
          id='phone'
          autoComplete='tel' // Added for telephone
          {...register("phone")}
          className={getInputClass("phone")}
        />
        {errors.phone && (
          <p className='mt-1 text-sm text-red-600'>{errors.phone.message}</p>
        )}
      </div>

      <div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-brand-primary text-white py-3 px-4 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:bg-gray-400'
        >
          {isSubmitting ? "Sending..." : "Send Enquiry"}
        </button>
      </div>

      {serverMessage && (
        <p
          className={`text-sm text-center p-2 rounded ${
            isError ? "text-red-800 bg-red-100" : "text-green-800 bg-green-100"
          }`}
        >
          {serverMessage}
        </p>
      )}
    </form>
  );
};
