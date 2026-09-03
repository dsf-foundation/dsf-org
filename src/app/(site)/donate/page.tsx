"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IoCheckmarkCircle,
  IoImageOutline,
  IoPhonePortraitOutline,
  IoBusinessOutline,
  IoGlobeOutline,
  IoDocumentTextOutline,
  IoTrashOutline,
  IoWalletOutline,
  IoPaperPlaneOutline,
  IoReceiptOutline,
  IoShieldCheckmark,
} from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { CopyButton } from "@/components/ui/copy-button";
import { site } from "@/data/site";
import { donationAccounts } from "@/data/accounts";
import { useClientHero } from "@/components/admin/client-hero";

const mobileAccounts = donationAccounts.filter((a) => a.kind === "mobile");
const bankAccounts = donationAccounts.filter((a) => a.kind === "bank");
const methodOptions = donationAccounts.map((a) => a.label);

const steps = [
  {
    icon: IoWalletOutline,
    title: "1. Send your donation",
    text: "Transfer any amount from a mobile wallet or bank to one of our accounts below — from Bangladesh or from anywhere abroad via SWIFT.",
  },
  {
    icon: IoPaperPlaneOutline,
    title: "2. Submit your details",
    text: "Fill in the quick form with your name, payment method and transaction ID, then press send.",
  },
  {
    icon: IoReceiptOutline,
    title: "3. Get your receipt",
    text: "We verify your payment and email you the official receipt and tax-relief certificate — for domestic and international donors alike.",
  },
];

export default function DonatePage() {
  const hero = useClientHero("donate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("");
  const [txId, setTxId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const subject = encodeURIComponent("Donation Verification & Receipt Request");
  const body = encodeURIComponent(
    `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "N/A"}\n` +
      `Payment Method: ${method}\n` +
      `Transaction ID: ${txId}\n` +
      `Attached File: ${file ? file.name : "No file selected"}\n\n` +
      `Please verify this payment and issue the official receipt.`
  );
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      {/* How it works */}
      <section className="border-b border-line bg-warm">
        <div className="container-site py-14 md:py-16">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="display-md text-3xl text-ink">
              Three simple steps to a verified receipt
            </h2>
          </Reveal>
          <Reveal className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="bg-surface p-7">
                <step.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-body">{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Donation accounts */}
      <section className="container-site section-pad">
        <Reveal className="mb-10 max-w-2xl">
          <h2 className="display-md text-3xl text-ink">
            Where to send your donation
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Tap copy to grab the details instantly. All accounts belong to the
            foundation and are used only for its programs.
          </p>
        </Reveal>

        {/* Mobile wallets */}
        <div className="mb-12">
          <Reveal className="mb-5 flex items-center gap-3">
            <IoPhonePortraitOutline className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-ink">Mobile wallets</h3>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mobileAccounts.reverse().map((acc, i) => (
              <Reveal key={acc.id} delay={i * 50}>
                <div className="group flex items-center justify-between gap-3 bg-surface px-4 py-3 ring-1 ring-line/50 transition-all duration-200 hover:ring-primary/40 hover:shadow-sm">
                  {/* Left: Logo */}
                  <div className="flex shrink-0 items-center">
                    {acc.logo ? (
                      <Image
                        src={acc.logo}
                        alt=""
                        width={72}
                        height={28}
                        className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-wider text-muted">
                        Account
                      </span>
                    )}
                  </div>

                  {/* Right: Number & Copy Action */}
                  <div className="flex items-center gap-3">
                    <p
                      dir="ltr"
                      className="font-mono text-base font-bold tracking-tight text-ink"
                    >
                      {acc.number}
                    </p>

                    <CopyButton value={acc.number.replace(/-/g, "")} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bank transfer */}
        <div>
          <Reveal className="mb-5 flex items-center gap-3">
            <IoBusinessOutline className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-ink">Bank transfer</h3>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {bankAccounts.map((acc, i) => (
              <Reveal key={acc.id} delay={i * 50}>
                <div className="overflow-hidden border border-line bg-surface">
                  <div className="flex items-center justify-between border-b border-black/10 px-5 py-3 text-white">
                    {/* <span className="text-xs font-bold">{acc.label}</span> */}
                    <span className="flex justify-between w-full items-center gap-2">
                      {acc.logo && (
                        <Image
                          src={acc.logo}
                          alt=""
                          width={64}
                          height={20}
                          className="h-5 w-auto object-contain"
                        />
                      )}
                      <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-xs font-medium">
                        <IoGlobeOutline className="h-3 w-3" />
                        {acc.bank?.supportsInternational
                          ? "Global"
                          : "Domestic"}
                      </span>
                    </span>
                  </div>
                  <div className="space-y-2 p-5 text-xs">
                    <FieldRow
                      label="Account Name"
                      value={acc.bank?.accountName ?? ""}
                    />
                    <FieldRow
                      label="Account Number"
                      value={acc.bank?.accountNumber ?? ""}
                      mono
                      highlight
                    />
                    <FieldRow
                      label="Bank Name"
                      value={acc.bank?.bankName ?? ""}
                    />
                    <FieldRow label="Branch" value={acc.bank?.branch ?? ""} />
                    <div className="my-2 grid grid-cols-2 gap-2 bg-warm p-2.5">
                      <div>
                        <span className="block text-xs text-muted">
                          Currency
                        </span>
                        <span className="font-bold text-ink">
                          {acc.bank?.currency ?? ""}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted">
                          Routing No.
                        </span>
                        <span className="font-mono font-bold text-ink">
                          {acc.bank?.routing ?? ""}
                        </span>
                      </div>
                    </div>
                    <FieldRow
                      label="SWIFT Code"
                      value={acc.bank?.swift ?? ""}
                      mono
                      copyable
                    />
                    <div className="flex items-center gap-1.5 pt-1 text-xs font-medium text-primary">
                      <IoCheckmarkCircle className="h-4 w-4 shrink-0" />
                      <span>Supports SWIFT international transfers</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="flex items-start gap-4 border border-primary/20 bg-primary-soft p-5 md:p-6">
              <IoGlobeOutline className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h4 className="text-sm font-bold text-ink">
                  Donating from outside Bangladesh?
                </h4>
                <p className="mt-1.5 text-sm leading-7 text-body">
                  You can send BDT or foreign currency directly to our NRB
                  Commercial Bank account using SWIFT code{" "}
                  <span className="font-mono font-bold text-primary-dark">
                    NRBCBDDH
                  </span>
                  . After wiring, submit the receipt request form below and
                  we&apos;ll verify it and email your official receipt —
                  wherever in the world you are.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Receipt request form */}
      <section className="border-t border-line bg-warm">
        <div className="container-site section-pad">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="display-md text-3xl text-ink">
                Request your verified receipt
              </h2>
              <p className="mt-5 text-base leading-8 text-body md:text-lg">
                After sending your donation, submit your details and we&apos;ll
                verify the payment and email you the official receipt and
                tax-relief certificate.
              </p>
              <div className="mt-8 flex items-start gap-4 border border-line bg-surface p-5">
                <IoShieldCheckmark className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <p className="text-sm leading-7 text-body">
                  Every donation is recorded and accounted for. Your transaction
                  details are used only to issue your receipt and are treated
                  with confidentiality.
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={80}
              className="border border-line bg-surface p-6 md:p-8"
            >
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = mailto;
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    label="Full Name"
                    ph="Your full name"
                    value={name}
                    onChange={setName}
                    required
                  />
                  <FormInput
                    label="Email Address"
                    ph="you@example.com"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    required
                  />
                  <FormInput
                    label="Phone (Optional)"
                    ph="01XXXXXXXXX"
                    value={phone}
                    onChange={setPhone}
                    dir="ltr"
                  />
                  <div>
                    <label className="mb-1 block text-xs font-bold text-ink/80">
                      Payment Method <span className="text-accent">*</span>
                    </label>
                    <select
                      value={method}
                      required
                      onChange={(e) => setMethod(e.target.value)}
                      className="h-11 w-full border border-line bg-surface px-3 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="" disabled>
                        Select method
                      </option>
                      {methodOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <FormInput
                  label="Transaction ID / Ref"
                  ph="e.g. 9HK4A8B7C1"
                  value={txId}
                  onChange={setTxId}
                  dir="ltr"
                  required
                />

                <div>
                  <label className="mb-1 block text-xs font-bold text-ink/80">
                    Upload receipt (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) setFile(selected);
                    }}
                  />
                  {!file ? (
                    <label
                      htmlFor="file-upload"
                      className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-line bg-warm p-13 text-center transition hover:border-primary/50"
                    >
                      <IoImageOutline className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-ink">
                        Tap to select a screenshot (PNG, JPG)
                      </span>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between border border-primary/30 bg-primary/5 p-2.5">
                      <div className="flex min-w-0 items-center gap-2">
                        <IoDocumentTextOutline className="h-5 w-5 shrink-0 text-primary" />
                        <span className="truncate text-xs font-semibold text-ink">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="p-1 text-muted transition hover:text-red-500"
                      >
                        <IoTrashOutline className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn py-3 btn-accent w-full">
                    Send Message
                  </button>
                </div>
              </form>

              <div className="mt-4 border-t border-line pt-3 text-center text-xs text-muted">
                <span>Need help? </span>
                <a
                  href={`tel:${site.phoneDisplay}`}
                  className="font-bold text-primary hover:underline"
                  dir="ltr"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function FieldRow({
  label,
  value,
  mono,
  highlight,
  copyable,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="shrink-0 text-xs text-muted">{label}</span>
      <div className="flex items-center gap-1.5">
        <span
          dir="ltr"
          className={`truncate text-right font-semibold ${
            highlight ? "font-bold text-primary" : "text-ink"
          } ${mono ? "font-mono" : ""}`}
        >
          {value}
        </span>
        {copyable && <CopyButton value={value} className="text-xs" />}
      </div>
    </div>
  );
}

function FormInput({
  label,
  ph,
  value,
  onChange,
  type = "text",
  dir,
  required,
}: {
  label: string;
  ph: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: "ltr" | "auto";
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-ink/80">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        dir={dir}
        required={required}
        value={value}
        placeholder={ph}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full border border-line bg-surface px-3 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted/40"
      />
    </div>
  );
}
