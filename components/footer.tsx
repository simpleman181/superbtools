import Link from "next/link";
import { Code2, Mail } from "lucide-react";

const categories = [
  {
    title: "PDF Studio",
    href: "/#pdf-studio",
    tools: [
      { name: "Merge & Split", href: "/pdf-tools" },
      { name: "PDF Viewer", href: "/pdf-viewer" },
      { name: "Compress PDF", href: "/pdf-compress" },
      { name: "Sign PDF", href: "/pdf-sign" },
      { name: "PDF OCR", href: "/pdf-ocr" },
      { name: "Word to PDF", href: "/word-to-pdf" },
    ],
  },
  {
    title: "Image, Media & Design",
    href: "/#image-media",
    tools: [
      { name: "Image Converter", href: "/image-converter" },
      { name: "Image Resizer", href: "/image-resizer" },
      { name: "Color Picker", href: "/color-picker" },
      { name: "Gradient Generator", href: "/gradient-generator" },
      { name: "Favicon Generator", href: "/favicon-generator" },
      { name: "AV Converter", href: "/av-converter" },
    ],
  },
  {
    title: "Text & Writing",
    href: "/#text-writing",
    tools: [
      { name: "Case Converter", href: "/case-converter" },
      { name: "Word Counter", href: "/word-counter" },
      { name: "Markdown", href: "/markdown-previewer" },
      { name: "HTML Entity", href: "/html-entity" },
      { name: "Lorem Ipsum", href: "/lorem-ipsum" },
      { name: "Citations", href: "/citation-generator" },
    ],
  },
  {
    title: "Developer & Network",
    href: "/#developer-network",
    tools: [
      { name: "JSON Formatter", href: "/json-formatter" },
      { name: "SQL Formatter", href: "/sql-formatter" },
      { name: "Regex Tester", href: "/regex-tester" },
      { name: "JWT Debugger", href: "/jwt-debugger" },
      { name: "IP Lookup", href: "/ip-lookup" },
      { name: "HTTP Status", href: "/http-status" },
    ],
  },
  {
    title: "Calculators & Time",
    href: "/#calculators-time",
    tools: [
      { name: "EMI Calculator", href: "/emi-calculator" },
      { name: "Unit Converter", href: "/unit-converter" },
      { name: "Age Calculator", href: "/age-calculator" },
      { name: "Timezone", href: "/timezone-converter" },
      { name: "Epoch Converter", href: "/epoch-converter" },
      { name: "Stopwatch", href: "/stopwatch" },
    ],
  },
  {
    title: "Security & Privacy",
    href: "/#security-privacy",
    tools: [
      { name: "Password Generator", href: "/password-generator" },
      { name: "Hash Generator", href: "/hash-generator" },
      { name: "Password Entropy", href: "/password-entropy" },
      { name: "Cert Decoder", href: "/cert-decoder" },
      { name: "CSP Generator", href: "/csp-generator" },
      { name: "EXIF Remover", href: "/exif-remover" },
    ],
  },
  {
    title: "Productivity",
    href: "/#productivity",
    tools: [
      { name: "QR Generator", href: "/qr-generator" },
      { name: "Invoice Generator", href: "/invoice-generator" },
      { name: "Barcode", href: "/barcode-generator" },
      { name: "Random Picker", href: "/random-picker" },
      { name: "Gantt Chart", href: "/gantt-chart" },
      { name: "Country Codes", href: "/country-codes" },
    ],
  },
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

        {/* Brand row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-8 border-b">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Code2 className="h-5 w-5 text-primary" />
            <span>MyToolMate</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            100+ free tools — PDF, design, code, calculators — running entirely in your browser. No sign-up. No server uploads.
          </p>
          <a href="mailto:logixmagix@proton.me" className="inline-flex items-center gap-2 text-sm text-primary hover:underline flex-shrink-0">
            <Mail className="h-4 w-4" />
            logixmagix@proton.me
          </a>
        </div>

        {/* 7-column category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 mb-10">
          {categories.map((cat) => (
            <div key={cat.title}>
              <Link href={cat.href} className="text-xs font-semibold uppercase tracking-wider text-foreground hover:text-primary block mb-3 transition-colors">
                {cat.title}
              </Link>
              <ul className="space-y-1.5">
                {cat.tools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} MyToolMate. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
