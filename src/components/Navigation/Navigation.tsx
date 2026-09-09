"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <div className="container site-nav-inner">
        <Link href="/" className="site-logo">
          DC<span className="dot">.</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#about">About</Link>
          <Link href="/resume" data-current={pathname === "/resume"} aria-current={pathname === "/resume" ? "page" : undefined}>
            Resume
          </Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
