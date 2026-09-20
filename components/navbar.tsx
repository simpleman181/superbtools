"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Menu, X, ChevronDown } from "lucide-react";

const categories = [
  {
    title: "PDF Studio",
    tools: [
      { name: "Merge & Split", href: "/pdf-tools" },
      { name: "PDF Viewer", href: "/pdf-viewer" },
      { name: "Compress PDF", href: "/pdf-compress" },
      { name: "Protect PDF", href: "/pdf-protect" },
      { name: "Rotate PDF", href: "/pdf-rotate" },
      { name: "Sign PDF", href: "/pdf-sign" },
      { name: "Organise PDF", href: "/pdf-organise" },
      { name: "Watermark PDF", href: "/pdf-watermark" },
      { name: "Delete Pages", href: "/pdf-delete-pages" },
      { name: "Page Numbers", href: "/pdf-page-numbers" },
      { name: "Unlock PDF", href: "/pdf-unlock" },
      { name: "Flatten PDF", href: "/pdf-flatten" },
      { name: "Crop PDF", href: "/pdf-crop" },
      { name: "Redact PDF", href: "/pdf-redact" },
      { name: "PDF to Image", href: "/pdf-to-image" },
      { name: "Image to PDF", href: "/image-to-pdf" },
      { name: "Word to PDF", href: "/word-to-pdf" },
      { name: "Excel to PDF", href: "/excel-to-pdf" },
      { name: "HTML to PDF", href: "/html-to-pdf" },
      { name: "TXT to PDF", href: "/txt-to-pdf" },
      { name: "CSV to PDF", href: "/csv-to-pdf" },
      { name: "PDF Form Filler", href: "/pdf-form" },
      { name: "PDF OCR", href: "/pdf-ocr" },
    ],
  },
  {
    title: "Image, Media & Design",
    tools: [
      { name: "Image Converter", href: "/image-converter" },
      { name: "Image Resizer", href: "/image-resizer" },
      { name: "Color Picker", href: "/color-picker" },
      { name: "Gradient Generator", href: "/gradient-generator" },
      { name: "SVG Optimizer", href: "/svg-optimizer" },
      { name: "SVG Path Editor", href: "/svg-path-editor" },
      { name: "Favicon Generator", href: "/favicon-generator" },
      { name: "AV Converter", href: "/av-converter" },
      { name: "TTS Player", href: "/tts-player" },
    ],
  },
  {
    title: "Text & Writing",
    tools: [
      { name: "Case Converter", href: "/case-converter" },
      { name: "Word Counter", href: "/word-counter" },
      { name: "Text Stripper", href: "/text-stripper" },
      { name: "Lorem Ipsum", href: "/lorem-ipsum" },
      { name: "Markdown", href: "/markdown-previewer" },
      { name: "ASCII Art", href: "/ascii-art" },
      { name: "Morse Code", href: "/morse-code" },
      { name: "Citations", href: "/citation-generator" },
      { name: "HTML Entity", href: "/html-entity" },
    ],
  },
  {
    title: "Developer & Network",
    tools: [
      { name: "JSON Formatter", href: "/json-formatter" },
      { name: "YAML↔JSON", href: "/yaml-json" },
      { name: "XML Formatter", href: "/xml-formatter" },
      { name: "SQL Formatter", href: "/sql-formatter" },
      { name: "GraphQL", href: "/graphql-beautifier" },
      { name: "Minifier", href: "/minifier" },
      { name: "Code Unpacker", href: "/code-unpacker" },
      { name: "CSS→Tailwind", href: "/css-tailwind" },
      { name: "Base64", href: "/base64" },
      { name: "URL Encoder", href: "/url-encoder" },
      { name: "JWT Debugger", href: "/jwt-debugger" },
      { name: "cURL Parser", href: "/curl-parser" },
      { name: "Diff Checker", href: "/diff-checker" },
      { name: "Regex Tester", href: "/regex-tester" },
      { name: "UUID Generator", href: "/uuid-generator" },
      { name: "Slug Generator", href: "/slug-generator" },
      { name: "Data Visualizer", href: "/data-visualizer" },
      { name: "IP Lookup", href: "/ip-lookup" },
      { name: "DNS Checker", href: "/dns-checker" },
      { name: "HTTP Status", href: "/http-status" },
      { name: "User-Agent", href: "/user-agent" },
      { name: "Subnet Calc", href: "/subnet-calculator" },
      { name: "Cron Generator", href: "/cron-generator" },
      { name: "Dead Pixel", href: "/dead-pixel" },
      { name: "Keyboard Test", href: "/keyboard-tester" },
      { name: "Audio Test", href: "/audio-tester" },
      { name: "Refresh Rate", href: "/refresh-rate" },
    ],
  },
  {
    title: "Calculators & Time",
    tools: [
      { name: "EMI Calculator", href: "/emi-calculator" },
      { name: "Compound Interest", href: "/compound-interest" },
      { name: "Percentage Calc", href: "/percentage-calculator" },
      { name: "Salary Estimator", href: "/salary-estimator" },
      { name: "Unit Converter", href: "/unit-converter" },
      { name: "Base Converter", href: "/base-converter" },
      { name: "Math Renderer", href: "/math-renderer" },
      { name: "Venn Diagram", href: "/venn-diagram" },
      { name: "Age Calculator", href: "/age-calculator" },
      { name: "Epoch Converter", href: "/epoch-converter" },
      { name: "Timezone", href: "/timezone-converter" },
      { name: "Stopwatch", href: "/stopwatch" },
    ],
  },
  {
    title: "Security & Privacy",
    tools: [
      { name: "Password Generator", href: "/password-generator" },
      { name: "Password Entropy", href: "/password-entropy" },
      { name: "Hash Generator", href: "/hash-generator" },
      { name: "Cert Decoder", href: "/cert-decoder" },
      { name: "CSP Generator", href: "/csp-generator" },
      { name: "EXIF Remover", href: "/exif-remover" },
    ],
  },
  {
    title: "Productivity",
    tools: [
      { name: "Invoice Generator", href: "/invoice-generator" },
      { name: "Time Card", href: "/time-card" },
      { name: "Gantt Chart", href: "/gantt-chart" },
      { name: "QR Generator", href: "/qr-generator" },
      { name: "Barcode", href: "/barcode-generator" },
      { name: "Random Picker", href: "/random-picker" },
      { name: "Dice Roller", href: "/dice-roller" },
      { name: "Country Codes", href: "/country-codes" },
      { name: "Coordinates", href: "/coordinates" },
      { name: "File Extension", href: "/file-extension" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
          <Code2 className="h-6 w-6 text-primary" />
          <span>MyToolMate</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 overflow-x-auto">
          {categories.map((cat) => (
            <div key={cat.title} className="relative group flex-shrink-0">
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors whitespace-nowrap">
                {cat.title}
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>
              {/* Dropdown — wide grid for PDF Studio & Developer */}
              <div className={`absolute top-full left-0 mt-1 rounded-xl border bg-popover shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                cat.tools.length > 12 ? 'w-[520px]' : cat.tools.length > 6 ? 'w-64' : 'w-48'
              }`}>
                <div className={`p-2 ${cat.tools.length > 12 ? 'grid grid-cols-3 gap-0.5' : 'flex flex-col gap-0.5'}`}>
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background max-h-[80vh] overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.title} className="border-b last:border-0">
              <button
                onClick={() => setOpenCat(openCat === cat.title ? null : cat.title)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground"
              >
                {cat.title}
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openCat === cat.title ? 'rotate-180' : ''}`} />
              </button>
              {openCat === cat.title && (
                <div className={`px-4 pb-3 ${cat.tools.length > 8 ? 'grid grid-cols-2 gap-0.5' : 'flex flex-col gap-0.5'}`}>
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
