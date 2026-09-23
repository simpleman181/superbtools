// ─── MASTER TOOL LIST ────────────────────────────────────────────────────────
// To add a tool: add one line to the right category below.
// To remove a tool: delete its line.
// Format: { name: "Display Name", href: "/route" }

export type Tool = { name: string; href: string };
export type Category = { id: string; title: string; color: string; tools: Tool[] };

export const categories: Category[] = [
  {
    id: "pdf-studio",
    title: "PDF Studio",
    color: "red",
    tools: [
      { name: "Merge & Split",    href: "/pdf-tools" },
      { name: "PDF Viewer",       href: "/pdf-viewer" },
      { name: "Compress PDF",     href: "/pdf-compress" },
      { name: "Protect PDF",      href: "/pdf-protect" },
      { name: "Unlock PDF",       href: "/pdf-unlock" },
      { name: "Rotate PDF",       href: "/pdf-rotate" },
      { name: "Delete Pages",     href: "/pdf-delete-pages" },
      { name: "Page Numbers",     href: "/pdf-page-numbers" },
      { name: "Watermark PDF",    href: "/pdf-watermark" },
      { name: "Sign PDF",         href: "/pdf-sign" },
      { name: "Flatten PDF",      href: "/pdf-flatten" },
      { name: "Crop PDF",         href: "/pdf-crop" },
      { name: "Redact PDF",       href: "/pdf-redact" },
      { name: "Organise PDF",     href: "/pdf-organise" },
      { name: "PDF Form Filler",  href: "/pdf-form" },
      { name: "PDF OCR",          href: "/pdf-ocr" },
      { name: "PDF to Image",     href: "/pdf-to-image" },
      { name: "Image to PDF",     href: "/image-to-pdf" },
      { name: "Word to PDF",      href: "/word-to-pdf" },
      { name: "Excel to PDF",     href: "/excel-to-pdf" },
      { name: "HTML to PDF",      href: "/html-to-pdf" },
      { name: "TXT to PDF",       href: "/txt-to-pdf" },
      { name: "CSV to PDF",       href: "/csv-to-pdf" },
    ],
  },
  {
    id: "image-design",
    title: "Image & Design",
    color: "pink",
    tools: [
      { name: "Image Converter",     href: "/image-converter" },
      { name: "Image Resizer",       href: "/image-resizer" },
      { name: "Color Picker",        href: "/color-picker" },
      { name: "Gradient Generator",  href: "/gradient-generator" },
      { name: "SVG Optimizer",       href: "/svg-optimizer" },
      { name: "SVG Path Editor",     href: "/svg-path-editor" },
      { name: "Favicon Generator",   href: "/favicon-generator" },
      { name: "AV Converter",        href: "/av-converter" },
      { name: "TTS Player",          href: "/tts-player" },
    ],
  },
  {
    id: "text-writing",
    title: "Text & Writing",
    color: "blue",
    tools: [
      { name: "Case Converter",   href: "/case-converter" },
      { name: "Word Counter",     href: "/word-counter" },
      { name: "Text Stripper",    href: "/text-stripper" },
      { name: "Lorem Ipsum",      href: "/lorem-ipsum" },
      { name: "Markdown",         href: "/markdown-previewer" },
      { name: "ASCII Art",        href: "/ascii-art" },
      { name: "Morse Code",       href: "/morse-code" },
      { name: "Citations",        href: "/citation-generator" },
      { name: "HTML Entity",      href: "/html-entity" },
    ],
  },
  {
    id: "developer",
    title: "Developer & Network",
    color: "indigo",
    tools: [
      { name: "JSON Formatter",   href: "/json-formatter" },
      { name: "YAML ↔ JSON",      href: "/yaml-json" },
      { name: "XML Formatter",    href: "/xml-formatter" },
      { name: "SQL Formatter",    href: "/sql-formatter" },
      { name: "GraphQL",          href: "/graphql-beautifier" },
      { name: "Minifier",         href: "/minifier" },
      { name: "Code Unpacker",    href: "/code-unpacker" },
      { name: "CSS → Tailwind",   href: "/css-tailwind" },
      { name: "Base64",           href: "/base64" },
      { name: "URL Encoder",      href: "/url-encoder" },
      { name: "JWT Debugger",     href: "/jwt-debugger" },
      { name: "cURL Parser",      href: "/curl-parser" },
      { name: "Diff Checker",     href: "/diff-checker" },
      { name: "Regex Tester",     href: "/regex-tester" },
      { name: "UUID Generator",   href: "/uuid-generator" },
      { name: "Slug Generator",   href: "/slug-generator" },
      { name: "Data Visualizer",  href: "/data-visualizer" },
      { name: "IP Lookup",        href: "/ip-lookup" },
      { name: "DNS Checker",      href: "/dns-checker" },
      { name: "HTTP Status",      href: "/http-status" },
      { name: "User-Agent",       href: "/user-agent" },
      { name: "Subnet Calc",      href: "/subnet-calculator" },
      { name: "Cron Generator",   href: "/cron-generator" },
      { name: "Dead Pixel",       href: "/dead-pixel" },
      { name: "Keyboard Test",    href: "/keyboard-tester" },
      { name: "Audio Test",       href: "/audio-tester" },
      { name: "Refresh Rate",     href: "/refresh-rate" },
    ],
  },
  {
    id: "calculators",
    title: "Calculators & Time",
    color: "emerald",
    tools: [
      { name: "EMI Calculator",      href: "/emi-calculator" },
      { name: "Compound Interest",   href: "/compound-interest" },
      { name: "Percentage Calc",     href: "/percentage-calculator" },
      { name: "Salary Estimator",    href: "/salary-estimator" },
      { name: "Unit Converter",      href: "/unit-converter" },
      { name: "Base Converter",      href: "/base-converter" },
      { name: "Math Renderer",       href: "/math-renderer" },
      { name: "Venn Diagram",        href: "/venn-diagram" },
      { name: "Age Calculator",      href: "/age-calculator" },
      { name: "Epoch Converter",     href: "/epoch-converter" },
      { name: "Timezone",            href: "/timezone-converter" },
      { name: "Stopwatch",           href: "/stopwatch" },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    color: "amber",
    tools: [
      { name: "Password Generator", href: "/password-generator" },
      { name: "Password Entropy",   href: "/password-entropy" },
      { name: "Hash Generator",     href: "/hash-generator" },
      { name: "Cert Decoder",       href: "/cert-decoder" },
      { name: "CSP Generator",      href: "/csp-generator" },
      { name: "EXIF Remover",       href: "/exif-remover" },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    color: "purple",
    tools: [
      { name: "Invoice Generator", href: "/invoice-generator" },
      { name: "Time Card",         href: "/time-card" },
      { name: "Gantt Chart",       href: "/gantt-chart" },
      { name: "QR Generator",      href: "/qr-generator" },
      { name: "Barcode",           href: "/barcode-generator" },
      { name: "Random Picker",     href: "/random-picker" },
      { name: "Dice Roller",       href: "/dice-roller" },
      { name: "Country Codes",     href: "/country-codes" },
      { name: "Coordinates",       href: "/coordinates" },
      { name: "File Extension",    href: "/file-extension" },
    ],
  },
];

// Flat list used for search — auto-derived, never edit manually
export const allTools = categories.flatMap(c =>
  c.tools.map(t => ({ ...t, category: c.title, categoryId: c.id }))
);

// Total tool count
export const toolCount = allTools.length;
