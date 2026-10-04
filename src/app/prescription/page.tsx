import type { Metadata } from "next";
import { Lock, PhoneCall, ScanLine, Truck } from "lucide-react";
import { PrescriptionForm } from "@/components/forms/PrescriptionForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Upload Prescription",
  description: "Upload your prescription and a licensed scaleB pharmacist will prepare your order.",
};

const steps = [
  { icon: ScanLine, title: "Upload", text: "Snap a clear photo or attach a PDF of your prescription." },
  { icon: PhoneCall, title: "Pharmacist review", text: "A licensed pharmacist verifies it and calls to confirm." },
  { icon: Truck, title: "Delivered", text: "Your medicines are packed safely and delivered fast." },
];

export default function PrescriptionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prescription"
        title="Upload your prescription"
        description="Send us your prescription and we’ll take care of the rest, safely and privately."
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_22rem] lg:items-start">
        <Reveal>
          <PrescriptionForm />
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 lg:sticky lg:top-24">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">How it works</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint-100 text-mint-700">
                    <s.icon aria-hidden className="h-6 w-6" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy-800 text-[0.7rem] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-900">{s.title}</span>
                    <span className="block text-navy-500">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="flex gap-3 rounded-[var(--radius-card)] bg-navy-800 p-6 text-navy-100">
            <Lock aria-hidden className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
            Your prescription is private and seen only by our licensed pharmacists.
          </p>
        </Reveal>
      </div>
    </>
  );
}
