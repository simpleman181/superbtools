import Link from "next/link";
import { categories, toolCount } from "@/lib/tools";

// Category accent colors
const colors: Record<string, { bg: string; text: string; dot: string }> = {
  red:     { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-400" },
  pink:    { bg: "bg-pink-50",    text: "text-pink-700",    dot: "bg-pink-400" },
  blue:    { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400" },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400" },
  purple:  { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400" },
};

const features = [
  { icon: "🔒", title: "100% In-Browser",  desc: "Nothing is uploaded. All tools run locally on your device." },
  { icon: "🆓", title: "Always Free",      desc: "No credits, no plans, no paywalls — every tool, every time." },
  { icon: "⚡", title: "Instant & Fast",   desc: "No server round-trips. Results appear in milliseconds." },
  { icon: "🚫", title: "No Sign-Up",       desc: "Open any tool and start working. No account needed." },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-[#1a3c5e] text-white py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            {toolCount}+ Free Tools,<br />Right in Your Browser
          </h1>
          <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto">
            PDF, design, code, calculators and more — no sign-up, no uploads, no limits.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/#pdf-studio"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition-colors">
              Explore PDF Studio
            </Link>
            <Link href="/#all-tools"
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section className="bg-white border-b py-8 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="text-sm font-semibold text-gray-800">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tool sections ── */}
      <div id="all-tools">
        {categories.map((cat, i) => {
          const c = colors[cat.color] ?? colors.indigo;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={i % 2 === 0 ? "bg-white py-12 px-4" : "bg-gray-50 py-12 px-4"}
            >
              <div className="mx-auto max-w-7xl">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-1 h-7 rounded-full ${c.dot}`} />
                  <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                    {cat.tools.length} tools
                  </span>
                </div>

                {/* Tool grid — simple flat list of cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {cat.tools.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-[#1a3c5e] hover:shadow-sm transition-all text-sm text-gray-700 hover:text-[#1a3c5e] group"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot} opacity-70 group-hover:opacity-100`} />
                      <span className="truncate font-medium">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#1a3c5e] text-white py-10 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Built for developers, by developers</h2>
        <p className="text-white/70 text-sm mb-6">
          Every tool runs 100% client-side. Your data never leaves your device.
        </p>
        <a href="mailto:logixmagix@proton.me"
          className="inline-block px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg text-sm transition-colors">
          Suggest a Tool →
        </a>
      </section>
    </div>
  );
}
