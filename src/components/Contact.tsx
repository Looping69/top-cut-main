"use client";
import React, { useState } from "react";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};
export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Write your submit logic here
    console.log(formData);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-[var(--primary-light)] bg-opacity-10 border border-[var(--primary)] border-opacity-20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 px-2 py-2 rounded-md text-sm text-[var(--text-dark)] w-full"
          value={formData.name.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
        <input
          type="email"
          placeholder="Your email address"
          className="bg-[var(--primary-light)] bg-opacity-10 border border-[var(--primary)] border-opacity-20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 px-2 py-2 rounded-md text-sm text-[var(--text-dark)] w-full"
          value={formData.email.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={10}
          className="bg-[var(--primary-light)] bg-opacity-10 border border-[var(--primary)] border-opacity-20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 px-2 mt-4 py-2 rounded-md text-sm text-[var(--text-dark)] w-full"
          value={formData.message.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              message: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
      </div>
      <button
        className="w-full px-2 py-2 mt-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] rounded-md font-bold text-white transition-colors duration-300"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
