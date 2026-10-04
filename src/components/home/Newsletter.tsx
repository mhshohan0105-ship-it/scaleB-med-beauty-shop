"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true); // Frontend only: no request is sent
  }

  return (
    <section className="section pt-8">
      <div className="container-page">
        <Reveal>
          <div className="card relative overflow-hidden bg-gradient-to-br from-mint-50 via-white to-blush-50 px-6 py-12 text-center sm:px-12 lg:py-16">
            <h2 className="text-3xl font-semibold sm:text-4xl">Join the scaleB circle</h2>
            <p className="mx-auto mt-3 max-w-lg text-lg text-navy-500">
              Health tips, skincare rituals and members-only offers. One thoughtful email a fortnight.
            </p>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.p
                  key="done"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-mint-100 px-5 py-3 font-semibold text-mint-700"
                >
                  <CircleCheck aria-hidden className="h-5 w-5" /> You’re subscribed. Welcome to scaleB!
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className="field flex-1 rounded-full px-5"
                  />
                  <Button type="submit" size="lg">
                    Subscribe <Send aria-hidden className="h-4 w-4" />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
            {error && (
              <p id="newsletter-error" role="alert" className="mt-3 text-sm font-medium text-blush-600">
                {error}
              </p>
            )}
            <p className="mt-4 text-sm text-navy-400">No spam. Unsubscribe anytime.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
