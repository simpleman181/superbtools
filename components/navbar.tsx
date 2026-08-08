"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  Menu,
  X,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  { name: "JSON Formatter", href: "/json-formatter", icon: FileJson },
  { name: "Case Converter", href: "/case-converter", icon: Type },
  { name: "Word Counter", href: "/word-counter", icon: AlignLeft },
  { name: "Markdown", href: "/markdown-previewer", icon: Eye },
  { name: "Base64", href: "/base64", icon: ArrowLeftRight },
  { name: "Password", href: "/password-generator", icon: Lock },
  { name: "Hash", href: "/hash-generator", icon: Hash },
  { name: "UUID", href: "/uuid-generator", icon: Fingerprint },
  { name: "Minifier", href: "/minifier", icon: Minimize2 },
  { name: "Color Picker", href: "/color-picker", icon: Palette },
  { name: "Image Converter", href: "/image-converter", icon: ImageIcon },
  { name: "CSV to JSON", href: "/csv-to-json", icon: Table },
  { name: "Regex Tester", href: "/regex-tester", icon: Regex },
  { name: "Epoch Converter", href: "/epoch-converter", icon: Clock },
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

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden md:flex items-center gap-1 overflow-x-auto">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
            >
              <tool.icon className="h-4 w-4" />
              {tool.name}
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 space-y-1">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <tool.icon className="h-4 w-4" />
              {tool.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
