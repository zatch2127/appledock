import { useEffect, useState, type FormEvent } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { mapsEmbedUrl, site, waHref } from "../data/site";
import { services } from "../data/services";
import { consumeDevicePrefill } from "../lib/router";
import { cn } from "../utils/cn";

/**
 * Optional: post the request to a form backend (Formspree, a serverless
 * function, the company CRM…). Without one, the form hands the validated
 * request to the visitor's WhatsApp with everything pre-filled — the
 * standard approach for Indian service businesses with no web backend.
 */
const FORM_ENDPOINT: string | null = null;

const issues = [
  "Screen / display",
  "Battery & charging",
  "Not powering on",
  "Liquid damage",
  "Camera / audio",
  "Software & data",
  "Something else",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  device: string;
  issue: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent" | "ready" | "error";

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  device: "",
  issue: "",
  message: "",
};

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 12)
    e.phone = "Enter a valid 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.device) e.device = "Select your device.";
  if (!v.issue) e.issue = "Select the closest match.";
  if (v.message.trim().length < 10)
    e.message = "Describe the problem briefly (min. 10 characters).";
  return e;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-red-700"
    >
      <AlertCircle className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

const contactRows = [
  { icon: Phone, label: "Phone", value: site.phone },
  { icon: MessageCircle, label: "WhatsApp", value: site.whatsapp },
  { icon: Mail, label: "Email", value: site.email },
  { icon: Clock, label: "Opening hours", value: site.hours },
];

export function Contact() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [prefilled, setPrefilled] = useState(false);

  // Device carried over from a "Book this repair" button elsewhere.
  useEffect(() => {
    const pending = consumeDevicePrefill();
    if (pending) {
      setValues((v) => ({ ...v, device: pending }));
      setPrefilled(true);
      const t = window.setTimeout(() => setPrefilled(false), 6000);
      return () => window.clearTimeout(t);
    }
  }, []);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const val = e.target.value;
      setValues((v) => ({ ...v, [key]: val }));
      setErrors((er) => ({ ...er, [key]: undefined }));
      if (status !== "idle") setStatus("idle");
    };

  const buildDraft = () => {
    const subject = `Service request — ${
      services.find((s) => s.id === values.device)?.name ?? "Apple device"
    }`;
    const body = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Device: ${values.device}`,
      `Issue: ${values.issue}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const buildWhatsApp = () => {
    const deviceLabel =
      services.find((s) => s.id === values.device)?.noun ?? values.device;
    const text = [
      "Hi AppleDock — I'd like to book a repair.",
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Device: ${deviceLabel}`,
      `Issue: ${values.issue}`,
      "",
      values.message,
    ].join("\n");
    return `${waHref}?text=${encodeURIComponent(text)}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const firstKey = (Object.keys(errs) as (keyof FormState)[])[0];
    if (firstKey) {
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("sent");
      } else {
        // No server endpoint — the visitor sends the validated request
        // themselves via WhatsApp (or email) in one tap.
        await new Promise((r) => setTimeout(r, 700));
        setStatus("ready");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Info + map */}
      <div className="flex flex-col gap-6 lg:col-span-5">
        <div className="rounded-xl border border-ink/10 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-bone">
              <MapPin
                className="size-[18px] text-brass-2"
                strokeWidth={1.5}
                aria-hidden
              />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight">
                {site.name} — {site.city}
              </h2>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink/55">
                {site.address}
              </p>
            </div>
          </div>

          <ul className="mt-7">
            {contactRows.map((row) => (
              <li
                key={row.label}
                className="flex items-center gap-4 border-t border-ink/10 py-4"
              >
                <row.icon
                  className="size-[18px] shrink-0 text-brass-2"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                  <span className="eyebrow text-ink/45">{row.label}</span>
                  <span className="text-[14px] font-medium text-ink">
                    {row.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>

              <p className="mt-2 border-t border-ink/10 pt-5 text-[12.5px] leading-relaxed text-ink/45">
                Service area: {site.city} and the neighbouring Mumbai suburbs.
                Walk-ins welcome during opening hours.
              </p>
        </div>

        <div className="relative h-[240px] flex-1 overflow-hidden rounded-xl border border-ink/10 sm:h-[300px] lg:h-auto lg:min-h-[280px]">
          <iframe
            title="Map — Thane, Maharashtra"
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-frame absolute inset-0 size-full border-0"
          />
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 sm:p-9 lg:col-span-7">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/10 pb-5">
          <h2 className="text-lg font-semibold tracking-tight">
            Request a service
          </h2>
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-ink/40 uppercase">
            Fields marked * are required
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="field-name" className="field-label">
                Full name <span aria-hidden className="text-brass-2">*</span>
              </label>
              <input
                id="field-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={set("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "err-name" : undefined}
                className={cn("field", errors.name && "field-error")}
              />
              <FieldError id="err-name" message={errors.name} />
            </div>

            <div>
              <label htmlFor="field-phone" className="field-label">
                Phone <span aria-hidden className="text-brass-2">*</span>
              </label>
              <input
                id="field-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="10-digit mobile number"
                value={values.phone}
                onChange={set("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                className={cn("field", errors.phone && "field-error")}
              />
              <FieldError id="err-phone" message={errors.phone} />
            </div>

            <div>
              <label htmlFor="field-email" className="field-label">
                Email <span aria-hidden className="text-brass-2">*</span>
              </label>
              <input
                id="field-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={set("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "err-email" : undefined}
                className={cn("field", errors.email && "field-error")}
              />
              <FieldError id="err-email" message={errors.email} />
            </div>

            <div>
              <label htmlFor="field-device" className="field-label">
                Device <span aria-hidden className="text-brass-2">*</span>
              </label>
              <div className="relative">
                <select
                  id="field-device"
                  value={values.device}
                  onChange={set("device")}
                  aria-invalid={Boolean(errors.device)}
                  aria-describedby={
                    errors.device
                      ? "err-device"
                      : prefilled
                        ? "note-device"
                        : undefined
                  }
                  className={cn(
                    "field appearance-none pr-10",
                    !values.device && "text-fog/70",
                    errors.device && "field-error"
                  )}
                >
                  <option value="" disabled>
                    Select your device
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.noun}
                    </option>
                  ))}
                  <option value="other">Other Apple device</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fog"
                  aria-hidden
                />
              </div>
              <FieldError id="err-device" message={errors.device} />
              {prefilled && !errors.device ? (
                <p
                  id="note-device"
                  className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-brass-2"
                >
                  <Check className="size-3.5" aria-hidden />
                  Pre-selected from services
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-issue" className="field-label">
                Issue <span aria-hidden className="text-brass-2">*</span>
              </label>
              <div className="relative">
                <select
                  id="field-issue"
                  value={values.issue}
                  onChange={set("issue")}
                  aria-invalid={Boolean(errors.issue)}
                  aria-describedby={errors.issue ? "err-issue" : undefined}
                  className={cn(
                    "field appearance-none pr-10",
                    !values.issue && "text-fog/70",
                    errors.issue && "field-error"
                  )}
                >
                  <option value="" disabled>
                    What's the closest match?
                  </option>
                  {issues.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fog"
                  aria-hidden
                />
              </div>
              <FieldError id="err-issue" message={errors.issue} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="field-message" className="field-label">
                Describe the problem{" "}
                <span aria-hidden className="text-brass-2">*</span>
              </label>
              <textarea
                id="field-message"
                rows={5}
                placeholder="e.g. My iPhone 13 screen cracked after a fall — touch still works, but there's a line across the display."
                value={values.message}
                onChange={set("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "err-message" : undefined}
                className={cn("field resize-none", errors.message && "field-error")}
              />
              <FieldError id="err-message" message={errors.message} />
            </div>
          </div>

          {/* Status panels */}
          <div aria-live="polite">
            {status === "sent" ? (
              <div className="mt-6 flex gap-3 rounded-lg border border-emerald-700/30 bg-emerald-50 p-4">
                <Check
                  className="size-5 shrink-0 text-emerald-700"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Request received
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-emerald-900/70">
                    Our team will get back to you shortly with a diagnosis plan
                    and quote.
                  </p>
                </div>
              </div>
            ) : null}

            {status === "ready" ? (
              <div className="mt-6 flex gap-3.5 rounded-lg border border-emerald-700/25 bg-emerald-50 p-4 sm:p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-600/10">
                  <Check className="size-5 text-emerald-700" aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">
                    Your request is ready to send.
                  </p>
                  <p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-ink/60">
                    One tap opens WhatsApp with everything pre-filled — send it,
                    and we'll reply with a diagnosis plan and a fixed quote
                    during working hours.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <a
                      href={buildWhatsApp()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ink btn-sm"
                    >
                      <MessageCircle className="size-3.5" aria-hidden />
                      Send via WhatsApp
                    </a>
                    <a
                      href={buildDraft()}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/65 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
                    >
                      <Mail className="size-3.5" aria-hidden />
                      Send as email instead
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            {status === "error" ? (
              <div className="mt-6 flex gap-3 rounded-lg border border-red-700/30 bg-red-50 p-4">
                <AlertCircle
                  className="size-5 shrink-0 text-red-700"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    Something went wrong
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-red-900/70">
                    We couldn't send your request. Please try again, or use the
                    email draft option.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12.5px] leading-relaxed text-ink/45">
              Your details are used only to respond to this request.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-ink btn-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Validating…
                </>
              ) : (
                <>
                  Request a Service
                  <Send className="size-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
