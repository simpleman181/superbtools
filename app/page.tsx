import Link from "next/link";
import {
  FileJson, Type, AlignLeft, Eye, ArrowLeftRight, Code, Eraser, Link2,
  KeyRound, Timer, Database, FileCode, Expand, Wind, Braces, Terminal, Minimize2,
  Lock, Hash, Fingerprint, Shield, Network,
  Table, Regex, Clock, BookOpen, BarChart3, GitCompare, Binary,
  Calculator, TrendingUp, Ruler, Percent, DollarSign,
  Palette, ImageIcon, Minimize2 as MinIcon, PenTool,
  Globe, Monitor, Server, Search,
  QrCode, Shuffle, Volume2, Radio, Dices,
  Receipt, CalendarDays,
  MapPin, Sigma, Calendar, GitMerge,
  Trash2, Music, FileText,
  Keyboard, Volume2 as Vol2,
} from "lucide-react";

const categories = [
  {
    title: "Text & Formatting",
    color: "bg-blue-500/10 text-blue-600",
    tools: [
      { name: "JSON Formatter", desc: "Format & validate JSON", icon: FileJson, href: "/json-formatter" },
      { name: "Case Converter", desc: "UPPER, lower, camelCase", icon: Type, href: "/case-converter" },
      { name: "Word Counter", desc: "Real-time text stats", icon: AlignLeft, href: "/word-counter" },
      { name: "Markdown", desc: "Live preview", icon: Eye, href: "/markdown-previewer" },
      { name: "Base64", desc: "Encode & decode", icon: ArrowLeftRight, href: "/base64" },
      { name: "HTML Entity", desc: "Encode special chars", icon: Code, href: "/html-entity" },
      { name: "Text Stripper", desc: "Remove HTML/emojis", icon: Eraser, href: "/text-stripper" },
      { name: "Slug Generator", desc: "URL-friendly strings", icon: Link2, href: "/slug-generator" },
      { name: "Lorem Ipsum", desc: "Placeholder text", icon: Type, href: "/lorem-ipsum" },
    ],
  },
  {
    title: "Developer & DevOps",
    color: "bg-indigo-500/10 text-indigo-600",
    tools: [
      { name: "JWT Debugger", desc: "Decode tokens", icon: KeyRound, href: "/jwt-debugger" },
      { name: "URL Encoder", desc: "Encode URLs", icon: Link2, href: "/url-encoder" },
      { name: "Cron Generator", desc: "Build schedules", icon: Timer, href: "/cron-generator" },
      { name: "SQL Formatter", desc: "Beautify SQL", icon: Database, href: "/sql-formatter" },
      { name: "YAML↔JSON", desc: "Config converter", icon: FileCode, href: "/yaml-json" },
      { name: "Code Unpacker", desc: "Expand minified code", icon: Expand, href: "/code-unpacker" },
      { name: "CSS→Tailwind", desc: "Convert to classes", icon: Wind, href: "/css-tailwind" },
      { name: "GraphQL", desc: "Beautify queries", icon: Braces, href: "/graphql-beautifier" },
      { name: "cURL Parser", desc: "To fetch/requests", icon: Terminal, href: "/curl-parser" },
      { name: "Minifier", desc: "Minify code", icon: MinIcon, href: "/minifier" },
    ],
  },
  {
    title: "Cryptography & Security",
    color: "bg-emerald-500/10 text-emerald-600",
    tools: [
      { name: "Password Generator", desc: "Secure passwords", icon: Lock, href: "/password-generator" },
      { name: "Hash Generator", desc: "MD5, SHA-256", icon: Hash, href: "/hash-generator" },
      { name: "UUID Generator", desc: "Unique IDs", icon: Fingerprint, href: "/uuid-generator" },
      { name: "Password Entropy", desc: "Strength analysis", icon: Shield, href: "/password-entropy" },
      { name: "Cert Decoder", desc: "X.509 parser", icon: Lock, href: "/cert-decoder" },
      { name: "Subnet Calc", desc: "Network ranges", icon: Network, href: "/subnet-calculator" },
      { name: "CSP Generator", desc: "Security headers", icon: Shield, href: "/csp-generator" },
    ],
  },
  {
    title: "Math & Data",
    color: "bg-orange-500/10 text-orange-600",
    tools: [
      { name: "CSV to JSON", desc: "Spreadsheet conversion", icon: Table, href: "/csv-to-json" },
      { name: "Regex Tester", desc: "Pattern matching", icon: Regex, href: "/regex-tester" },
      { name: "Epoch Converter", desc: "Unix timestamps", icon: Clock, href: "/epoch-converter" },
      { name: "JSON to Excel", desc: "To CSV/Excel", icon: Table, href: "/json-excel" },
      { name: "Base Converter", desc: "Binary/Hex/Octal", icon: Binary, href: "/base-converter" },
      { name: "Data Visualizer", desc: "Array charts", icon: BarChart3, href: "/data-visualizer" },
      { name: "Diff Checker", desc: "Compare lists", icon: GitCompare, href: "/diff-checker" },
    ],
  },
  {
    title: "Financial",
    color: "bg-green-500/10 text-green-600",
    tools: [
      { name: "EMI Calculator", desc: "Loan repayments", icon: Calculator, href: "/emi-calculator" },
      { name: "Compound Interest", desc: "Investment growth", icon: TrendingUp, href: "/compound-interest" },
      { name: "Unit Converter", desc: "Metric/Imperial", icon: Ruler, href: "/unit-converter" },
      { name: "Percentage Calc", desc: "Quick math", icon: Percent, href: "/percentage-calculator" },
      { name: "Salary Estimator", desc: "Take-home pay", icon: DollarSign, href: "/salary-estimator" },
    ],
  },
  {
    title: "Design & Web",
    color: "bg-purple-500/10 text-purple-600",
    tools: [
      { name: "Color Picker", desc: "HEX, RGB, contrast", icon: Palette, href: "/color-picker" },
      { name: "Image Converter", desc: "PNG, WebP, JPG", icon: ImageIcon, href: "/image-converter" },
      { name: "Gradient Gen", desc: "CSS gradients", icon: Palette, href: "/gradient-generator" },
      { name: "Image Resizer", desc: "Resize & crop", icon: ImageIcon, href: "/image-resizer" },
      { name: "SVG Optimizer", desc: "Minimize SVGs", icon: MinIcon, href: "/svg-optimizer" },
      { name: "Favicon Gen", desc: "Multi-size icons", icon: ImageIcon, href: "/favicon-generator" },
      { name: "SVG Path Editor", desc: "Edit paths", icon: PenTool, href: "/svg-path-editor" },
    ],
  },
  {
    title: "Network & API",
    color: "bg-cyan-500/10 text-cyan-600",
    tools: [
      { name: "IP Lookup", desc: "Public IP & geo", icon: Globe, href: "/ip-lookup" },
      { name: "User-Agent", desc: "Browser parser", icon: Monitor, href: "/user-agent" },
      { name: "XML Formatter", desc: "Beautify XML", icon: FileCode, href: "/xml-formatter" },
      { name: "DNS Checker", desc: "A, MX, TXT records", icon: Server, href: "/dns-checker" },
      { name: "HTTP Status", desc: "Status code lookup", icon: Search, href: "/http-status" },
    ],
  },
  {
    title: "Productivity",
    color: "bg-pink-500/10 text-pink-600",
    tools: [
      { name: "QR Generator", desc: "QR codes", icon: QrCode, href: "/qr-generator" },
      { name: "Random Picker", desc: "Pick winners", icon: Shuffle, href: "/random-picker" },
      { name: "Stopwatch", desc: "Timer & laps", icon: Clock, href: "/stopwatch" },
      { name: "Barcode", desc: "UPC/EAN codes", icon: QrCode, href: "/barcode-generator" },
      { name: "TTS Player", desc: "Text-to-speech", icon: Volume2, href: "/tts-player" },
      { name: "Morse Code", desc: "Translate & play", icon: Radio, href: "/morse-code" },
      { name: "Dice Roller", desc: "Roll & flip", icon: Dices, href: "/dice-roller" },
    ],
  },
  {
    title: "Hardware",
    color: "bg-slate-500/10 text-slate-600",
    tools: [
      { name: "Dead Pixel", desc: "Screen tester", icon: Monitor, href: "/dead-pixel" },
      { name: "Keyboard Test", desc: "Rollover test", icon: Keyboard, href: "/keyboard-tester" },
      { name: "Audio Test", desc: "Frequency gen", icon: Vol2, href: "/audio-tester" },
      { name: "Refresh Rate", desc: "Hz detector", icon: Monitor, href: "/refresh-rate" },
    ],
  },
  {
    title: "HR & Academic",
    color: "bg-amber-500/10 text-amber-600",
    tools: [
      { name: "Invoice", desc: "Printable invoices", icon: Receipt, href: "/invoice-generator" },
      { name: "Time Card", desc: "Work hours", icon: Clock, href: "/time-card" },
      { name: "Age Calculator", desc: "Date duration", icon: CalendarDays, href: "/age-calculator" },
      { name: "Citations", desc: "APA/MLA/Chicago", icon: BookOpen, href: "/citation-generator" },
      { name: "Math Renderer", desc: "LaTeX to HTML", icon: Sigma, href: "/math-renderer" },
      { name: "Gantt Chart", desc: "Project timelines", icon: Calendar, href: "/gantt-chart" },
      { name: "Venn Diagram", desc: "Set overlaps", icon: GitMerge, href: "/venn-diagram" },
    ],
  },
  {
    title: "Localization",
    color: "bg-teal-500/10 text-teal-600",
    tools: [
      { name: "Timezone", desc: "Global converter", icon: Globe, href: "/timezone-converter" },
      { name: "Country Codes", desc: "ISO & dialing", icon: Globe, href: "/country-codes" },
      { name: "Coordinates", desc: "GPS finder", icon: MapPin, href: "/coordinates" },
      { name: "ASCII Art", desc: "Block letters", icon: Type, href: "/ascii-art" },
    ],
  },
  {
    title: "Privacy & File",
    color: "bg-rose-500/10 text-rose-600",
    tools: [
      { name: "EXIF Remover", desc: "Strip metadata", icon: Trash2, href: "/exif-remover" },
      { name: "File Extension", desc: "Rename formats", icon: FileText, href: "/file-extension" },
      { name: "AV Converter", desc: "Audio/video", icon: Music, href: "/av-converter" },
      { name: "PDF Tools", desc: "Split & merge", icon: FileText, href: "/pdf-tools" },
    ],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Developer <span className="text-primary">Toolkit</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of 76+ essential utilities for developers. Fast, free, and runs entirely in your browser.
        </p>
      </div>

      <div className="grid gap-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${cat.color.split(" ")[0]}`} />
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
