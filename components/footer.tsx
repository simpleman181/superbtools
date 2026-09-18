import Link from "next/link";
import { Code2, Mail } from "lucide-react";

const toolCategories = [
  { name: "Text & Formatting", href: "/#text" },
  { name: "Developer & DevOps", href: "/#devops" },
  { name: "Math & Data", href: "/#math" },
  { name: "Financial", href: "/#financial" },
  { name: "Design & Web", href: "/#design" },
  { name: "Network & API", href: "/#network" },
];

const popularTools = [
  { name: "JSON Formatter", href: "/json-formatter" },
  { name: "Password Generator", href: "/password-generator" },
  { name: "Base64 Encoder", href: "/base64" },
  { name: "UUID Generator", href: "/uuid-generator" },
  { name: "QR Code Generator", href: "/qr-generator" },
  { name: "SQL Formatter", href: "/sql-formatter" },
];

const legal = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <Code2 className="h-5 w-5 text-primary" />
              <span>MyToolMate</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Free, fast, privacy-first developer utilities — 77+ tools that run entirely in your browser. No sign-up. No data sent to servers.
            </p>
            <a href="mailto:logixmagix@proton.me"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <Mail className="h-4 w-4" />
              logixmagix@proton.me
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Categories</h3>
            <ul className="space-y-2">
              {toolCategories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Popular Tools</h3>
            <ul className="space-y-2">
              {popularTools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Legal & Info</h3>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} MyToolMate. All rights reserved.</p>
          <p>Built for developers, by developers. All tools run client-side — your data never leaves your browser.</p>
        </div>
      </div>
    </footer>
  );
}
