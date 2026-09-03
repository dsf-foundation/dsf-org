"use client";

import { useState } from "react";
import {
  IoArrowForward,
  IoCheckmarkCircle,
  IoMailOutline,
} from "react-icons/io5";
import { dict } from "@/data/dictionary";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="grid gap-5 py-12 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
      <div>
        <p className="flex items-center gap-3 text-sm font-semibold text-white">
          
          {dict.home.newsletter}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Sign up for occasional field stories and updates. No spam —
          unsubscribe anytime.
        </p>
      </div>

      {done ? (
        <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85">
          <IoCheckmarkCircle className="h-5 w-5 shrink-0 text-accent" />
          <span>You&apos;re on the list. Thank you!</span>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
          className="flex w-full gap-2 sm:w-96"
        >
          <div className="flex flex-1 items-center border border-white/20 bg-white/5 transition focus-within:border-accent">
            <IoMailOutline className="ml-3 h-4 w-4 text-white/50" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDone(false);
              }}
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full bg-transparent px-2.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary shrink-0 px-5 py-2.5 text-sm"
          >
            {dict.actions.subscribe}
            <IoArrowForward className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
