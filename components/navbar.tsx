"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";

const categories = [
  {
    title: "Text & Formatting",
    tools: [
      { name: "JSON Formatter", href: "/json-formatter" },
      { name: "Case Converter", href: "/case-converter" },
      { name: "Word Counter", href: "/word-counter" },
      { name: "Markdown", href: "/markdown-previewer" },
      { name: "Base64", href: "/base64" },
      { name: "HTML Entity", href: "/html-entity" },
      { name: "Text Stripper", href: "/text-stripper" },
      { name: "Slug Generator", href: "/slug-generator" },
      { name: "Lorem Ipsum", href: "/lorem-ipsum" },
    ],
  },
  {
    title: "Developer & DevOps",
    tools: [
      { name: "JWT Debugger", href: "/jwt-debugger" },
      { name: "URL Encoder", href: "/url-encoder" },
      { name: "Cron Generator", href: "/cron-generator" },
      { name: "SQL Formatter", href: "/sql-formatter" },
      { name: "YAML↔JSON", href: "/yaml-json" },
      { name: "Code Unpacker", href: "/code-unpacker" },
      { name: "CSS→Tailwind", href: "/css-tailwind" },
      { name: "GraphQL", href: "/graphql-beautifier" },
      { name: "cURL Parser", href: "/curl-parser" },
      { name: "Minifier", href: "/minifier" },
    ],
  },
  {
    title: "Cryptography & Security",
    tools: [
      { name: "Password Generator", href: "/password-generator" },
      { name: "Hash Generator", href: "/hash-generator" },
      { name: "UUID Generator", href: "/uuid-generator" },
      { name: "Password Entropy", href: "/password-entropy" },
      { name: "Cert Decoder", href: "/cert-decoder" },
      { name: "Subnet Calculator", href: "/subnet-calculator" },
      { name: "CSP Generator", href: "/csp-generator" },
    ],
  },
  {
    title: "Math & Data",
    tools: [
      { name: "CSV to JSON", href: "/csv-to-json" },
      { name: "Regex Tester", href: "/regex-tester" },
      { name: "Epoch Converter", href: "/epoch-converter" },
      { name: "JSON to Excel", href: "/json-excel" },
      { name: "Base Converter", href: "/base-converter" },
      { name: "Data Visualizer", href: "/data-visualizer" },
      { name: "Diff Checker", href: "/diff-checker" },
    ],
  },
  {
    title: "Financial",
    tools: [
      { name: "EMI Calculator", href: "/emi-calculator" },
      { name: "Compound Interest", href: "/compound-interest" },
      { name: "Unit Converter", href: "/unit-converter" },
      { name: "Percentage Calc", href: "/percentage-calculator" },
      { name: "Salary Estimator", href: "/salary-estimator" },
    ],
  },
  {
    title: "Design & Web",
    tools: [
      { name: "Color Picker", href: "/color-picker" },
      { name: "Image Converter", href: "/image-converter" },
      { name: "Gradient Generator", href: "/gradient-generator" },
      { name: "Image Resizer", href: "/image-resizer" },
      { name: "SVG Optimizer", href: "/svg-optimizer" },
      { name: "Favicon Generator", href: "/favicon-generator" },
      { name: "SVG Path Editor", href: "/svg-path-editor" },
    ],
  },
  {
    title: "Network & API",
    tools: [
      { name: "IP Lookup", href: "/ip-lookup" },
      { name: "User-Agent", href: "/user-agent" },
      { name: "XML Formatter", href: "/xml-formatter" },
      { name: "DNS Checker", href: "/dns-checker" },
      { name: "HTTP Status", href: "/http-status" },
    ],
  },
  {
    title: "Productivity",
    tools: [
      { name: "QR Generator", href: "/qr-generator" },
      { name: "Random Picker", href: "/random-picker" },
      { name: "Stopwatch", href: "/stopwatch" },
      { name: "Barcode", href: "/barcode-generator" },
      { name: "TTS Player", href: "/tts-player" },
      { name: "Morse Code", href: "/morse-code" },
      { name: "Dice Roller", href: "/dice-roller" },
    ],
  },
  {
    title: "Hardware",
    tools: [
      { name: "Dead Pixel", href: "/dead-pixel" },
      { name: "Keyboard Test", href: "/keyboard-tester" },
      { name: "Audio Test", href: "/audio-tester" },
      { name: "Refresh Rate", href: "/refresh-rate" },
    ],
  },
  {
    title: "HR & Academic",
    tools: [
      { name: "Invoice", href: "/invoice-generator" },
      { name: "Time Card", href: "/time-card" },
      { name: "Age Calculator", href: "/age-calculator" },
      { name: "Citations", href: "/citation-generator" },
      { name: "Math Renderer", href: "/math-renderer" },
      { name: "Gantt Chart", href: "/gantt-chart" },
      { name: "Venn Diagram", href: "/venn-diagram" },
    ],
  },
  {
    title: "Localization",
    tools: [
      { name: "Timezone", href: "/timezone-converter" },
      { name: "Country Codes", href: "/country-codes" },
      { name: "Coordinates", href: "/coordinates" },
      { name: "ASCII Art", href: "/ascii-art" },
    ],
  },
  {
    title: "Privacy & File",
    tools: [
      { name: "EXIF Remover", href: "/exif-remover" },
      { name: "File Extension", href: "/file-extension" },
      { name: "AV Converter", href: "/av-converter" },
      { name: "PDF Tools", href: "/pdf-tools" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Code2 className="h-6 w-6 text-primary" />
          <span>DevToolkit</span>
        </Link>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden md:flex items-center gap-1">
          {categories.map((cat) => (
            <div key={cat.title} className="relative group">
              <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors">
                {cat.title}
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md border bg-popover shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-1">
                  {cat.tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="block px-3 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground">
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 max-h-[70vh] overflow-auto">
          {categories.map((cat) => (
            <div key={cat.title} className="mb-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{cat.title}</div>
              <div className="space-y-0.5">
                {cat.tools.map((tool) => (
                  <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)} className="block px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md">
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
