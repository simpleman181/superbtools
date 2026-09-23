"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Code2, Menu, X, ChevronDown, Search } from "lucide-react";

const categories = [
  {
    title: "PDF Studio",
    cols: 3,
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
    title: "Image & Design",
    cols: 1,
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
    cols: 1,
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
    title: "Developer",
    cols: 3,
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
    title: "Calculators",
    cols: 1,
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
    title: "Security",
    cols: 1,
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
    cols: 1,
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

// Flat list for search
const allTools = categories.flatMap(c => c.tools.map(t => ({ ...t, category: c.title })));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenCat(null);
        setShowSearch(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search input when shown
  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  const close = () => { setOpenCat(null); setShowSearch(false); setSearchQuery(""); };

  const searchResults = searchQuery.length > 1
    ? allTools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 12)
    : [];

  return (
    <nav ref={navRef} className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 gap-2">

        {/* Logo */}
        <Link href="/" onClick={close}
          className="flex items-center gap-2 font-bold text-lg flex-shrink-0">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">MyToolMate</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0 flex-1 overflow-x-auto">
          {categories.map((cat) => {
            const isOpen = openCat === cat.title;
            return (
              <div key={cat.title} className="relative flex-shrink-0">
                <button
                  onClick={() => setOpenCat(isOpen ? null : cat.title)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isOpen ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {cat.title}
                  <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown — always in DOM, toggled via style */}
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={`absolute top-full left-0 mt-1 rounded-xl border bg-popover shadow-xl z-50 ${
                    cat.cols === 3 ? "w-[480px]" : "w-52"
                  }`}
                >
                  <div className={`p-2 max-h-[75vh] overflow-y-auto ${cat.cols === 3 ? "grid grid-cols-3 gap-0.5" : "flex flex-col gap-0.5"}`}>
                    {cat.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={close}
                        className="block px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search button + panel */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => { setShowSearch(v => !v); setOpenCat(null); }}
            className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search tools"
          >
            <Search className="h-4 w-4" />
          </button>

          {showSearch && (
            <div className="absolute right-0 top-full mt-1 w-72 rounded-xl border bg-popover shadow-xl z-50">
              <div className="p-2">
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search 100+ tools…"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {searchQuery.length > 1 && (
                <div className="px-2 pb-2 max-h-72 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No tools found for "{searchQuery}"</p>
                  ) : (
                    searchResults.map(tool => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={close}
                        className="flex items-center justify-between px-3 py-1.5 rounded-md text-sm hover:bg-accent transition-colors"
                      >
                        <span>{tool.name}</span>
                        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{tool.category}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
              {searchQuery.length === 0 && (
                <p className="text-xs text-muted-foreground text-center pb-3">Type at least 2 characters to search</p>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => { setMobileOpen(v => !v); setOpenCat(null); }}
          className="md:hidden p-1.5 rounded-md hover:bg-accent"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background max-h-[80vh] overflow-y-auto">
          {/* Mobile search */}
          <div className="px-4 py-3 border-b">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {searchQuery.length > 1 && (
              <div className="mt-2 space-y-0.5">
                {searchResults.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-2 text-center">No results</p>
                ) : searchResults.map(tool => (
                  <Link key={tool.href} href={tool.href}
                    onClick={() => { setMobileOpen(false); close(); }}
                    className="flex items-center justify-between px-3 py-1.5 rounded-md text-sm hover:bg-accent">
                    <span>{tool.name}</span>
                    <span className="text-xs text-muted-foreground">{tool.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile categories */}
          {categories.map((cat) => (
            <div key={cat.title} className="border-b last:border-0">
              <button
                onClick={() => setOpenCat(openCat === cat.title ? null : cat.title)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold"
              >
                {cat.title}
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-150 ${openCat === cat.title ? "rotate-180" : ""}`} />
              </button>
              <div style={{ display: openCat === cat.title ? "block" : "none" }}>
                <div className={`px-4 pb-3 ${cat.tools.length > 8 ? "grid grid-cols-2 gap-0.5" : "flex flex-col gap-0.5"}`}>
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => { setMobileOpen(false); close(); }}
                      className="block px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
