"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { siteConfig } from "@/data/site";

const professionalMessage =
  "Hello Qodeax! I'm interested in learning more about your services and would like to discuss a project.";

export function WhatsappPopup() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const whatsappHref = siteConfig.links.whatsapp
    ? `${siteConfig.links.whatsapp}?text=${encodeURIComponent(professionalMessage)}`
    : null;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !popupRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end sm:right-6 sm:bottom-6">
      {open ? (
        <div
          ref={popupRef}
          id="contact-popup"
          className="mb-3 w-[calc(100vw-2rem)] max-w-[320px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-line bg-surface-soft p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                <MessageCircle className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-ink">Talk to Qodeax</h3>
                <p className="mt-0.5 text-[10.5px] text-ink-muted">
                  {whatsappHref ? "Usually replies within a few hours" : "Email is the fastest route"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
              aria-label="Close contact panel"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className="p-4">
            <p className="text-[12.5px] leading-relaxed text-ink-muted">
              Have a project or a question? Send us a note and we will point you in the right direction.
            </p>

            <div className="mt-4 grid gap-2">
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-xl bg-brand px-3.5 py-2.5 text-[12.5px] font-semibold text-brand-foreground transition-colors hover:bg-brand-strong"
                >
                  Chat on WhatsApp
                  <Send className="size-3.5" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[12.5px] font-medium text-ink transition-colors hover:border-line-strong"
              >
                Email {siteConfig.email}
              </a>
              <Link
                href="/#contact"
                className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[12.5px] font-medium text-ink transition-colors hover:border-line-strong"
              >
                Use the project form
              </Link>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-ink-muted">
              By contacting us, you agree to our{" "}
              <Link href="/privacy" className="text-brand-deep underline">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="contact-popup"
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="flex size-12 items-center justify-center rounded-full bg-dark text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5 hover:bg-dark-hover focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
      >
        {open ? <X className="size-4.5" /> : <MessageCircle className="size-4.5" />}
      </button>
    </div>
  );
}
