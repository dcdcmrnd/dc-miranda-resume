"use client";

import Link from "next/link";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-nav">
        <div className="container site-nav-inner">
          <Link href="/" className="brand-pill" aria-label="DC Miranda home">
            DC Miranda
          </Link>
          <button
            type="button"
            className="menu-pill"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "close" : "menu"}
            <span className="menu-indicator" aria-hidden="true" />
          </button>
        </div>
      </header>
      {/* Rendered outside <header> deliberately: that element has
          backdrop-filter, which (like transform) makes it a containing
          block for position:fixed descendants — the overlay's inset:0
          would resolve against the header's own ~70px height instead of
          the viewport if nested inside it. */}
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
