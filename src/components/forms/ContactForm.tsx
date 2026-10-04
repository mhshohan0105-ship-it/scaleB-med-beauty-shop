"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) next.email = "Please enter a valid email.";
    if (String(data.get("message") ?? "").trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true); // Frontend only: nothing is sent
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status" className="card flex flex-col items-center px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-mint-600">
          <CircleCheck aria-hidden className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-3xl font-semibold">Message sent</h2>
        <p className="mt-2 text-navy-500">Thanks for reaching out. We usually reply within a few hours. (Demo only.)</p>
        <Button variant="secondary" className="mt-8" onClick={() => setSent(false)}>
          Send another
        </Button>
      </motion.div>
    );
  }

  const err = (key: string) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="mt-1.5 text-sm font-medium text-blush-600">
        {errors[key]}
      </p>
    );
  const a11y = (key: string) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">Send us a message</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="label">Name</label>
          <input id="c-name" name="name" autoComplete="name" className="field" {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="c-email" className="label">Email</label>
          <input id="c-email" name="email" type="email" autoComplete="email" className="field" {...a11y("email")} />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor="c-topic" className="label">Topic</label>
        <select id="c-topic" name="topic" className="field cursor-pointer">
          <option>Order support</option>
          <option>Prescription query</option>
          <option>Product advice</option>
          <option>Returns &amp; refunds</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-message" className="label">Message</label>
        <textarea id="c-message" name="message" rows={5} className="field resize-y" {...a11y("message")} />
        {err("message")}
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send message <Send aria-hidden className="h-4 w-4" />
      </Button>
    </form>
  );
}
