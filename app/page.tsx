import Link from "next/link";
import {
  FileJson,
  Type,
  AlignLeft,
  Eye,
  ArrowLeftRight,
  Lock,
  Hash,
  Fingerprint,
  Minimize2,
  Palette,
  ImageIcon,
  Table,
  Regex,
  Clock,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Text & Formatting",
    color: "bg-blue-500/10 text-blue-600",
    tools: [
      { name: "JSON Formatter", desc: "Format and validate JSON", icon: FileJson, href: "/json-formatter" },
      { name: "Case Converter", desc: "UPPER, lower, camelCase", icon: Type, href: "/case-converter" },
      { name: "Word Counter", desc: "Words, chars, reading time", icon: AlignLeft, href: "/word-counter" },
      { name: "Markdown", desc: "Live Markdown preview", icon: Eye, href: "/markdown-previewer" },
      { name: "Base64", desc: "Encode & decode", icon: ArrowLeftRight, href: "/base64" },
    ],
  },
  {
    title: "Cryptography & Security",
    color: "bg-emerald-500/10 text-emerald-600",
    tools: [
      { name: "Password Generator", desc: "Secure passwords", icon: Lock, href: "/password-generator" },
      { name: "Hash Generator", desc: "MD5, SHA-1, SHA-256", icon: Hash, href: "/hash-generator" },
      { name: "UUID Generator", desc: "Unique identifiers", icon: Fingerprint, href: "/uuid-generator" },
    ],
  },
  {
    title: "Design & Web",
    color: "bg-purple-500/10 text-purple-600",
    tools: [
      { name: "Minifier", desc: "Minify HTML/CSS/JS", icon: Minimize2, href: "/minifier" },
      { name: "Color Picker", desc: "HEX, RGB, contrast", icon: Palette, href: "/color-picker" },
      { name: "Image Converter", desc: "PNG, WebP, JPG", icon: ImageIcon, href: "/image-converter" },
    ],
  },
  {
    title: "Math & Data",
    color: "bg-orange-500/10 text-orange-600",
    tools: [
      { name: "CSV to JSON", desc: "Spreadsheet conversion", icon: Table, href: "/csv-to-json" },
      { name: "Regex Tester", desc: "Pattern matching", icon: Regex, href: "/regex-tester" },
      { name: "Epoch Converter", desc: "Unix timestamps", icon: Clock, href: "/epoch-converter" },
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
          A collection of 14+ essential utilities for developers. Fast, free, and runs entirely in your browser.
        </p>
      </div>

      <div className="grid gap-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${cat.color.split(" ")[0]}`} />
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{tool.desc}</p>
                  </div>
                  <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
