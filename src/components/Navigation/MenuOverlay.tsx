"use client";

import Link from "next/link";
import { useEffect } from "react";
import { contact } from "@/projects/projectData";

const LINKS = [
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "experience" },
  { href: "/#about", label: "about" },
  { href: "/resume", label: "resume" },
  { href: "/#contact", label: "contact" },
];

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`menu-overlay-backdrop${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-overlay-card" role="dialog" aria-modal="true" aria-label="Site menu">
        <button type="button" className="menu-close" onClick={onClose}>
          close
          <span className="menu-close-x" aria-hidden="true">
            ×
          </span>
        </button>
        <nav className="menu-overlay-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} tabIndex={open ? 0 : -1}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu-overlay-footer">
          <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
            {contact.email}
          </a>
          <div className="menu-overlay-social">
            <a href={contact.whatsapp.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              WhatsApp
            </a>
            <a href={contact.portfolio.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              Notion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
