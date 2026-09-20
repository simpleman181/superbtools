import Link from "next/link";
import {
  FilePlus2, Eye, Minimize2, Lock, RotateCw, PenLine, LayoutGrid, Droplets,
  Trash2, Hash, Unlock, Layers, Crop, EyeOff, ImageIcon, FileText, Sheet,
  Code, Table, ClipboardList, ScanText,
  ImageIcon as Img, Expand, Palette, Sparkles, PenTool, Music,
  Volume2, Type, AlignLeft, Eraser, FileType2, Eye as EyeIcon, Brush,
  Radio, BookOpen,
  FileJson, ArrowLeftRight, FileCode, Database, Braces, Terminal,
  Wind, Minimize2 as Min2, Link2, KeyRound, GitCompare, Regex,
  Fingerprint, BarChart3,
  Globe, Wifi, Monitor, Server, Search, Timer,
  Keyboard, Volume2 as Vol2, Maximize,
  Calculator, TrendingUp, Ruler, Percent, DollarSign, Binary,
  Sigma, Calendar, Clock, MapPin,
  ShieldCheck, ShieldAlert, Hash as H, Scan, Shield, Camera,
  QrCode, Receipt, CalendarDays, Dices, Shuffle, Flag, Navigation, FileQuestion,
} from "lucide-react";

const sections = [
  {
    id: "pdf-studio",
    title: "PDF Studio",
    subtitle: "23 tools — merge, convert, protect, sign and more",
    accent: "from-red-500/10 to-orange-500/5",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    tools: [
      { name: "Merge & Split", desc: "Combine or extract pages", icon: FilePlus2, href: "/pdf-tools" },
      { name: "PDF Viewer", desc: "View in-browser", icon: Eye, href: "/pdf-viewer" },
      { name: "Compress PDF", desc: "Reduce file size", icon: Minimize2, href: "/pdf-compress" },
      { name: "Protect PDF", desc: "Password & permissions", icon: Lock, href: "/pdf-protect" },
      { name: "Rotate PDF", desc: "Per-page rotation", icon: RotateCw, href: "/pdf-rotate" },
      { name: "Sign PDF", desc: "Draw & embed signature", icon: PenLine, href: "/pdf-sign" },
      { name: "Organise PDF", desc: "Drag to reorder pages", icon: LayoutGrid, href: "/pdf-organise" },
      { name: "Watermark PDF", desc: "Text overlay", icon: Droplets, href: "/pdf-watermark" },
      { name: "Delete Pages", desc: "Remove selected pages", icon: Trash2, href: "/pdf-delete-pages" },
      { name: "Page Numbers", desc: "Stamp numbering", icon: Hash, href: "/pdf-page-numbers" },
      { name: "Unlock PDF", desc: "Remove password", icon: Unlock, href: "/pdf-unlock" },
      { name: "Flatten PDF", desc: "Make form fields static", icon: Layers, href: "/pdf-flatten" },
      { name: "Crop PDF", desc: "Trim margins", icon: Crop, href: "/pdf-crop" },
      { name: "Redact PDF", desc: "Black-box redaction", icon: EyeOff, href: "/pdf-redact" },
      { name: "PDF to Image", desc: "PNG / JPG per page", icon: ImageIcon, href: "/pdf-to-image" },
      { name: "Image to PDF", desc: "JPG / PNG → PDF", icon: FileText, href: "/image-to-pdf" },
      { name: "Word to PDF", desc: ".docx conversion", icon: FileText, href: "/word-to-pdf" },
      { name: "Excel to PDF", desc: "Spreadsheet table", icon: Sheet, href: "/excel-to-pdf" },
      { name: "HTML to PDF", desc: "Render HTML page", icon: Code, href: "/html-to-pdf" },
      { name: "TXT to PDF", desc: "Plain text → PDF", icon: FileType2, href: "/txt-to-pdf" },
      { name: "CSV to PDF", desc: "Data table", icon: Table, href: "/csv-to-pdf" },
      { name: "PDF Form Filler", desc: "Fill AcroForm fields", icon: ClipboardList, href: "/pdf-form" },
      { name: "PDF OCR", desc: "Extract text from scans", icon: ScanText, href: "/pdf-ocr" },
    ],
  },
  {
    id: "image-media",
    title: "Image, Media & Design",
    subtitle: "Convert, resize, design and transform visual assets",
    accent: "from-pink-500/10 to-rose-500/5",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    tools: [
      { name: "Image Converter", desc: "PNG, JPG, WebP, BMP", icon: Img, href: "/image-converter" },
      { name: "Image Resizer", desc: "Resize in-browser", icon: Expand, href: "/image-resizer" },
      { name: "Color Picker", desc: "HEX, RGB, HSL", icon: Palette, href: "/color-picker" },
      { name: "Gradient Generator", desc: "CSS gradient code", icon: Sparkles, href: "/gradient-generator" },
      { name: "SVG Optimizer", desc: "Reduce SVG size", icon: Min2, href: "/svg-optimizer" },
      { name: "SVG Path Editor", desc: "Inspect bezier paths", icon: PenTool, href: "/svg-path-editor" },
      { name: "Favicon Generator", desc: "All sizes from image", icon: Img, href: "/favicon-generator" },
      { name: "AV Converter", desc: "Audio format convert", icon: Music, href: "/av-converter" },
      { name: "TTS Player", desc: "Text to speech", icon: Volume2, href: "/tts-player" },
    ],
  },
  {
    id: "text-writing",
    title: "Text & Writing",
    subtitle: "Format, count, transform and generate text",
    accent: "from-blue-500/10 to-cyan-500/5",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    tools: [
      { name: "Case Converter", desc: "UPPER, lower, camelCase", icon: Type, href: "/case-converter" },
      { name: "Word Counter", desc: "Words, chars, reading time", icon: AlignLeft, href: "/word-counter" },
      { name: "Text Stripper", desc: "Remove HTML & emojis", icon: Eraser, href: "/text-stripper" },
      { name: "Lorem Ipsum", desc: "Placeholder text", icon: FileType2, href: "/lorem-ipsum" },
      { name: "Markdown", desc: "Live preview editor", icon: EyeIcon, href: "/markdown-previewer" },
      { name: "ASCII Art", desc: "Text to ASCII", icon: Brush, href: "/ascii-art" },
      { name: "Morse Code", desc: "Encode with audio", icon: Radio, href: "/morse-code" },
      { name: "Citations", desc: "APA, MLA, Chicago", icon: BookOpen, href: "/citation-generator" },
      { name: "HTML Entity", desc: "Encode special chars", icon: Code, href: "/html-entity" },
    ],
  },
  {
    id: "developer-network",
    title: "Developer & Network",
    subtitle: "Code formatters, encoders, API tools and hardware testers",
    accent: "from-indigo-500/10 to-violet-500/5",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    tools: [
      { name: "JSON Formatter", desc: "Format & validate", icon: FileJson, href: "/json-formatter" },
      { name: "YAML↔JSON", desc: "Config converter", icon: FileCode, href: "/yaml-json" },
      { name: "XML Formatter", desc: "Pretty-print XML", icon: FileCode, href: "/xml-formatter" },
      { name: "SQL Formatter", desc: "Beautify SQL", icon: Database, href: "/sql-formatter" },
      { name: "GraphQL", desc: "Beautify queries", icon: Braces, href: "/graphql-beautifier" },
      { name: "Minifier", desc: "Minify JS & CSS", icon: Min2, href: "/minifier" },
      { name: "Code Unpacker", desc: "Expand minified code", icon: Terminal, href: "/code-unpacker" },
      { name: "CSS→Tailwind", desc: "Convert to classes", icon: Wind, href: "/css-tailwind" },
      { name: "Base64", desc: "Encode & decode", icon: ArrowLeftRight, href: "/base64" },
      { name: "URL Encoder", desc: "Percent-encoding", icon: Link2, href: "/url-encoder" },
      { name: "JWT Debugger", desc: "Decode tokens", icon: KeyRound, href: "/jwt-debugger" },
      { name: "cURL Parser", desc: "Parse cURL commands", icon: Terminal, href: "/curl-parser" },
      { name: "Diff Checker", desc: "Compare text blocks", icon: GitCompare, href: "/diff-checker" },
      { name: "Regex Tester", desc: "Test & debug regex", icon: FileJson, href: "/regex-tester" },
      { name: "UUID Generator", desc: "Generate UUIDs", icon: Fingerprint, href: "/uuid-generator" },
      { name: "Slug Generator", desc: "URL-friendly strings", icon: Link2, href: "/slug-generator" },
      { name: "Data Visualizer", desc: "Charts from data", icon: BarChart3, href: "/data-visualizer" },
      { name: "IP Lookup", desc: "Geolocation & ISP", icon: Globe, href: "/ip-lookup" },
      { name: "DNS Checker", desc: "A, MX, TXT records", icon: Wifi, href: "/dns-checker" },
      { name: "HTTP Status", desc: "Status code reference", icon: Server, href: "/http-status" },
      { name: "User-Agent", desc: "Browser info parser", icon: Monitor, href: "/user-agent" },
      { name: "Subnet Calc", desc: "CIDR & host ranges", icon: Wifi, href: "/subnet-calculator" },
      { name: "Cron Generator", desc: "Build cron schedules", icon: Timer, href: "/cron-generator" },
      { name: "Dead Pixel", desc: "Screen test", icon: Monitor, href: "/dead-pixel" },
      { name: "Keyboard Test", desc: "Key press tester", icon: Keyboard, href: "/keyboard-tester" },
      { name: "Audio Test", desc: "Speaker & headphone", icon: Vol2, href: "/audio-tester" },
      { name: "Refresh Rate", desc: "Monitor Hz meter", icon: Maximize, href: "/refresh-rate" },
    ],
  },
  {
    id: "calculators-time",
    title: "Calculators & Time",
    subtitle: "Financial, unit, date and math calculators",
    accent: "from-emerald-500/10 to-teal-500/5",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    tools: [
      { name: "EMI Calculator", desc: "Loan amortization", icon: Calculator, href: "/emi-calculator" },
      { name: "Compound Interest", desc: "Growth over time", icon: TrendingUp, href: "/compound-interest" },
      { name: "Percentage Calc", desc: "Discounts & tips", icon: Percent, href: "/percentage-calculator" },
      { name: "Salary Estimator", desc: "Take-home pay", icon: DollarSign, href: "/salary-estimator" },
      { name: "Unit Converter", desc: "Length, weight, temp", icon: Ruler, href: "/unit-converter" },
      { name: "Base Converter", desc: "Binary, hex, octal", icon: Binary, href: "/base-converter" },
      { name: "Math Renderer", desc: "LaTeX formulas", icon: Sigma, href: "/math-renderer" },
      { name: "Venn Diagram", desc: "Set diagrams", icon: Braces, href: "/venn-diagram" },
      { name: "Age Calculator", desc: "Exact age in days", icon: Calendar, href: "/age-calculator" },
      { name: "Epoch Converter", desc: "Unix timestamp", icon: Clock, href: "/epoch-converter" },
      { name: "Timezone", desc: "World clock & DST", icon: Globe, href: "/timezone-converter" },
      { name: "Stopwatch", desc: "Lap timer", icon: Timer, href: "/stopwatch" },
    ],
  },
  {
    id: "security-privacy",
    title: "Security & Privacy",
    subtitle: "Passwords, hashes, certificates and secure tools",
    accent: "from-amber-500/10 to-yellow-500/5",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    tools: [
      { name: "Password Generator", desc: "Secure passwords", icon: ShieldCheck, href: "/password-generator" },
      { name: "Password Entropy", desc: "Strength & crack time", icon: ShieldAlert, href: "/password-entropy" },
      { name: "Hash Generator", desc: "MD5, SHA-256, SHA-512", icon: H, href: "/hash-generator" },
      { name: "Cert Decoder", desc: "X.509 certificate info", icon: Scan, href: "/cert-decoder" },
      { name: "CSP Generator", desc: "Content security policy", icon: Shield, href: "/csp-generator" },
      { name: "EXIF Remover", desc: "Strip image metadata", icon: Camera, href: "/exif-remover" },
    ],
  },
  {
    id: "productivity",
    title: "Productivity & Reference",
    subtitle: "Generators, planners and quick-reference tools",
    accent: "from-purple-500/10 to-fuchsia-500/5",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    tools: [
      { name: "Invoice Generator", desc: "Professional invoices", icon: Receipt, href: "/invoice-generator" },
      { name: "Time Card", desc: "Track work hours", icon: CalendarDays, href: "/time-card" },
      { name: "Gantt Chart", desc: "Project timeline", icon: BarChart3, href: "/gantt-chart" },
      { name: "QR Generator", desc: "Scannable QR codes", icon: QrCode, href: "/qr-generator" },
      { name: "Barcode", desc: "Code128 & EAN-13", icon: Scan, href: "/barcode-generator" },
      { name: "Random Picker", desc: "Pick from a list", icon: Shuffle, href: "/random-picker" },
      { name: "Dice Roller", desc: "D4 to D20", icon: Dices, href: "/dice-roller" },
      { name: "Country Codes", desc: "Dial codes", icon: Flag, href: "/country-codes" },
      { name: "Coordinates", desc: "GPS & DMS converter", icon: Navigation, href: "/coordinates" },
      { name: "File Extension", desc: "What opens this file?", icon: FileQuestion, href: "/file-extension" },
    ],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          Every tool you need,<br className="sm:hidden" /> right in your browser
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          100+ free utilities — PDF, design, code, calculators. No sign-up. No file uploads. Everything runs client-side.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            {/* Section header */}
            <div className="flex items-baseline gap-3 mb-5">
              <h2 className="text-xl font-bold">{section.title}</h2>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${section.badge}`}>
                {section.tools.length} tools
              </span>
              <p className="text-sm text-muted-foreground hidden sm:block">{section.subtitle}</p>
            </div>

            {/* Tool grid */}
            <div className={`grid gap-2 ${
              section.tools.length >= 20
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                : section.tools.length >= 10
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}>
              {section.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5 text-sm hover:border-primary/50 hover:bg-accent transition-all"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <div className="font-medium truncate leading-tight">{tool.name}</div>
                      <div className="text-xs text-muted-foreground truncate leading-tight mt-0.5">{tool.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom trust strip */}
      <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>All tools run <strong className="text-foreground">100% in your browser</strong> — no file uploads, no accounts, no tracking.</p>
      </div>
    </div>
  );
}
