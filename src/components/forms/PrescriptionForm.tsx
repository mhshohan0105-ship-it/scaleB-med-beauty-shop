"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, FileText, ImageIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MAX_FILES = 3;
const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

interface UploadItem {
  id: string;
  file: File;
  preview?: string;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function PrescriptionForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const problems: string[] = [];
    const accepted: UploadItem[] = [];
    for (const file of incoming) {
      if (!ACCEPTED.includes(file.type)) problems.push(`${file.name}: use JPG, PNG, WEBP or PDF.`);
      else if (file.size > MAX_SIZE) problems.push(`${file.name}: larger than 5 MB.`);
      else
        accepted.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        });
    }
    const merged = [...uploads, ...accepted.filter((a) => !uploads.some((p) => p.id === a.id))];
    if (merged.length > MAX_FILES) problems.push(`You can upload up to ${MAX_FILES} files.`);
    merged.slice(MAX_FILES).forEach((u) => u.preview && URL.revokeObjectURL(u.preview));
    setUploads(merged.slice(0, MAX_FILES));
    setFileError(problems.join(" "));
  }

  function removeUpload(id: string) {
    setUploads((prev) => {
      const target = prev.find((u) => u.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((u) => u.id !== id);
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter the patient’s name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(String(data.get("phone") ?? "").trim())) next.phone = "Please enter a valid phone number.";
    if (uploads.length === 0) next.files = "Please attach at least one prescription.";
    if (!data.get("consent")) next.consent = "Please confirm the prescription is valid.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true); // Frontend only: nothing is uploaded
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="card flex flex-col items-center px-6 py-16 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-mint-600">
          <CircleCheck aria-hidden className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-3xl font-semibold">Prescription received</h2>
        <p className="mt-2 max-w-md text-navy-500">
          Our licensed pharmacist will review it and call you within 30 minutes during working hours. (Demo only: no
          files were uploaded.)
        </p>
        <Button
          className="mt-8"
          variant="secondary"
          onClick={() => {
            uploads.forEach((u) => u.preview && URL.revokeObjectURL(u.preview));
            setUploads([]);
            setSubmitted(false);
          }}
        >
          Upload another
        </Button>
      </motion.div>
    );
  }

  const fieldError = (key: string) =>
    errors[key] && (
      <p id={`${key}-error`} className="mt-1.5 text-sm font-medium text-blush-600">
        {errors[key]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-6 p-6 sm:p-8">
      <div>
        <span id="files-label" className="label">
          Prescription files <span className="font-normal text-navy-400">(up to {MAX_FILES})</span>
        </span>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition",
            dragging ? "border-mint-400 bg-mint-50" : "border-navy-100 bg-cream hover:border-mint-300",
            errors.files && "border-blush-300",
          )}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-100 text-mint-700">
            <Upload aria-hidden className="h-7 w-7" />
          </span>
          <p className="mt-4 font-semibold text-navy-900">Drag &amp; drop your prescription here</p>
          <p className="mt-1 text-sm text-navy-500">JPG, PNG, WEBP or PDF · max 5 MB each</p>
          <Button variant="secondary" className="mt-5" onClick={() => inputRef.current?.click()}>
            Browse files
          </Button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPTED.join(",")}
            aria-labelledby="files-label"
            aria-describedby={errors.files ? "files-error" : undefined}
            className="sr-only"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
        {fileError && (
          <p role="alert" className="mt-2 text-sm font-medium text-blush-600">
            {fileError}
          </p>
        )}
        {fieldError("files")}

        <ul className="mt-4 space-y-2">
          <AnimatePresence initial={false}>
            {uploads.map((u) => (
              <motion.li
                key={u.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 rounded-2xl bg-paper p-3 ring-1 ring-navy-100"
              >
                {u.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={u.preview} alt={`Preview of ${u.file.name}`} className="h-12 w-12 rounded-xl object-cover" />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blush-100 text-blush-600">
                    {u.file.type === "application/pdf" ? <FileText aria-hidden className="h-6 w-6" /> : <ImageIcon aria-hidden className="h-6 w-6" />}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-navy-900">{u.file.name}</span>
                  <span className="text-sm text-navy-400">{formatSize(u.file.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeUpload(u.id)}
                  aria-label={`Remove ${u.file.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-navy-400 hover:bg-blush-50 hover:text-blush-600"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rx-name" className="label">
            Patient name
          </label>
          <input id="rx-name" name="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="rx-phone" className="label">
            Phone number
          </label>
          <input id="rx-phone" name="phone" type="tel" autoComplete="tel" className="field" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {fieldError("phone")}
        </div>
        <div>
          <label htmlFor="rx-email" className="label">
            Email <span className="font-normal text-navy-400">(optional)</span>
          </label>
          <input id="rx-email" name="email" type="email" autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor="rx-doctor" className="label">
            Doctor’s name <span className="font-normal text-navy-400">(optional)</span>
          </label>
          <input id="rx-doctor" name="doctor" className="field" />
        </div>
      </div>

      <div>
        <label htmlFor="rx-notes" className="label">
          Notes for the pharmacist <span className="font-normal text-navy-400">(optional)</span>
        </label>
        <textarea id="rx-notes" name="notes" rows={3} className="field resize-y" placeholder="E.g. I need only the first two medicines" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-navy-700">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5" aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>I confirm this is a valid prescription issued by a registered medical practitioner.</span>
        </label>
        {fieldError("consent")}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Upload aria-hidden className="h-5 w-5" /> Submit prescription
      </Button>
    </form>
  );
}
