"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { site } from "@/data/site";

const interests = [
  { value: "Volunteering", label: "I want to volunteer" },
  { value: "Partnership", label: "I want to partner with you" },
  { value: "Sponsoring a project", label: "I want to sponsor a project" },
  { value: "General", label: "Something else" },
];

export function EmailForm({
  defaultInterest = "Volunteering",
}: {
  defaultInterest?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${interest} — ${name || "A supporter"}`;
    const body = [
      "Hello Do Something Foundation,",
      "",
      `My interest: ${interest}`,
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      "",
      message || "I would love to talk about getting involved with your work.",
      "",
      "Please get back to me.",
    ].join("\n");
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Your name
          </label>
          <input
            id="ef-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahim Khan"
            className="w-full border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="ef-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Your email
          </label>
          <input
            id="ef-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ef-interest" className="mb-1.5 block text-sm font-semibold text-ink">
          What would you like to do?
        </label>
        <select
          id="ef-interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {interests.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ef-message" className="mb-1.5 block text-sm font-semibold text-ink">
          Your message{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="ef-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Tell us a little about how you'd like to help..."
          className="w-full resize-y border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        className="btn py-3 btn-accent w-full"
      >
        Send us an email
      </button>
    
    </form>
  );
}
