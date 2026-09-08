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
        <nav className="nav-links">
          <Link href="/#work">Work</Link>
          <Link href="/resume" data-current={pathname === "/resume"}>
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
