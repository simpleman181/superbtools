"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { categories, allTools } from "@/lib/tools";

export default function Navbar() {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenCat(null);
        setShowSearch(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  const closeAll = () => {
    setOpenCat(null);
    setShowSearch(false);
    setQuery("");
    setMobileOpen(false);
  };

  const results = query.length > 1
    ? allTools.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  return (
    <header ref={ref} className="sticky top-0 z-50 bg-[#1a3c5e] text-white shadow-md">
      <div className="mx-auto max-w-7xl flex h-14 items-center justify-between px-4 gap-3">

        {/* Logo */}
        <Link href="/" onClick={closeAll}
          className="flex items-center gap-2 font-bold text-lg flex-shrink-0 text-white hover:text-orange-300 transition-colors">
          <span className="text-orange-400">⚡</span>
          <span>MyToolMate</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 overflow-x-auto">
          {categories.map(cat => {
            const isOpen = openCat === cat.id;
            const isWide = cat.tools.length > 15;
            return (
              <div key={cat.id} className="relative flex-shrink-0">

                {/* Trigger button */}
                <button
                  type="button"
                  onClick={() => setOpenCat(isOpen ? null : cat.id)}
                  className={[
                    "flex items-center gap-1 px-2.5 py-1.5 text-sm rounded transition-colors whitespace-nowrap",
                    isOpen
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  {cat.title}
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-150"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {/* Dropdown — only rendered when open, portal-less */}
                {isOpen && (
                  <div
                    className={[
                      "absolute top-full left-0 mt-1 rounded-xl border border-gray-200 bg-white shadow-2xl z-[100]",
                      isWide ? "w-[480px]" : "w-52",
                    ].join(" ")}
                  >
                    <div className="px-3 py-2 border-b border-gray-100">
                      <span className="text-xs font-bold text-[#1a3c5e] uppercase tracking-wide">
                        {cat.title}
                      </span>
                    </div>
                    <div
                      className={[
                        "p-2 max-h-[70vh] overflow-y-auto",
                        isWide ? "grid grid-cols-3 gap-0.5" : "flex flex-col gap-0.5",
                      ].join(" ")}
                    >
                      {cat.tools.map(tool => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={closeAll}
                          className="block px-3 py-1.5 text-sm text-gray-700 rounded-md hover:bg-orange-50 hover:text-[#1a3c5e] transition-colors"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Search */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => { setShowSearch(v => !v); setOpenCat(null); }}
            className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Search tools"
          >
            <Search className="h-4 w-4" />
          </button>

          {showSearch && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-2xl z-[100]">
              <div className="p-2">
                <input
                  ref={searchRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search 100+ tools…"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]"
                />
              </div>
              {query.length > 1 && (
                <div className="px-2 pb-2 max-h-64 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-3">
                      No results for &quot;{query}&quot;
                    </p>
                  ) : (
                    results.map(t => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={closeAll}
                        className="flex items-center justify-between px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-orange-50 hover:text-[#1a3c5e] transition-colors"
                      >
                        <span>{t.name}</span>
                        <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                          {t.category}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              )}
              {query.length <= 1 && (
                <p className="text-xs text-gray-400 text-center pb-3">
                  Type to search tools
                </p>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => { setMobileOpen(v => !v); setOpenCat(null); setQuery(""); }}
          className="md:hidden p-1.5 rounded hover:bg-white/10 text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          {/* Mobile search bar */}
          <div className="px-4 py-3 border-b border-gray-100">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]"
            />
            {query.length > 1 && results.length > 0 && (
              <div className="mt-2 space-y-0.5">
                {results.map(t => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={closeAll}
                    className="flex items-center justify-between px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-orange-50 hover:text-[#1a3c5e]"
                  >
                    <span>{t.name}</span>
                    <span className="text-xs text-gray-400">{t.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile category accordions */}
          {categories.map(cat => (
            <div key={cat.id} className="border-b border-gray-100 last:border-0">
              <button
                type="button"
                onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#1a3c5e]"
              >
                {cat.title}
                <ChevronDown
                  className="h-4 w-4 text-gray-400 transition-transform duration-150"
                  style={{ transform: openCat === cat.id ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {openCat === cat.id && (
                <div
                  className={[
                    "px-4 pb-3",
                    cat.tools.length > 8 ? "grid grid-cols-2 gap-0.5" : "flex flex-col gap-0.5",
                  ].join(" ")}
                >
                  {cat.tools.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={closeAll}
                      className="block px-3 py-1.5 text-sm text-gray-600 rounded-md hover:bg-orange-50 hover:text-[#1a3c5e] transition-colors"
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
    </header>
  );
}
