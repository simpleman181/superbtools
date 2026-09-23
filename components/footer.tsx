import Link from "next/link";
import { categories, toolCount } from "@/lib/tools";

const legal = [
  { name: "About",         href: "/about" },
  { name: "Contact",       href: "/contact" },
  { name: "Privacy",       href: "/privacy-policy" },
  { name: "Terms",         href: "/terms" },
  { name: "Disclaimer",    href: "/disclaimer" },
  { name: "Cookies",       href: "/cookie-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1a3c5e] text-white mt-16">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8">

        {/* Brand + category columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 mb-10">
          {/* Brand col — spans 2 cols on large */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-orange-400">⚡</span> MyToolMate
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {toolCount}+ free tools — PDF, design, code, calculators. Everything runs in your browser. No sign-up required.
            </p>
            <a href="mailto:logixmagix@proton.me"
              className="text-sm text-orange-300 hover:text-orange-200 transition-colors">
              logixmagix@proton.me
            </a>
          </div>

          {/* One column per category — show top 5 tools each */}
          {categories.map(cat => (
            <div key={cat.id}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
                {cat.title}
              </h3>
              <ul className="space-y-1.5">
                {cat.tools.slice(0, 5).map(tool => (
                  <li key={tool.href}>
                    <Link href={tool.href}
                      className="text-xs text-white/70 hover:text-orange-300 transition-colors">
                      {tool.name}
                    </Link>
                  </li>
                ))}
                {cat.tools.length > 5 && (
                  <li>
                    <Link href={`/#${cat.id}`}
                      className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                      +{cat.tools.length - 5} more →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} MyToolMate. All rights reserved. All tools run client-side — no data is sent to servers.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {legal.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">{l.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
