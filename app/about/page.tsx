export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">About MyToolMate</h1>
      <p className="text-muted-foreground mb-8">Free developer utilities built for the modern web.</p>
      <div className="space-y-6">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">What is MyToolMate?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            MyToolMate is a free, open-access collection of 77+ developer and productivity utilities — JSON formatters,
            password generators, regex testers, QR code generators, PDF tools, and much more. Every tool runs entirely
            inside your browser. Nothing is uploaded, stored, or logged on any server.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-3">Our Philosophy</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div><span className="font-semibold text-foreground">Privacy first —</span> All processing happens in your browser. We do not collect, transmit, or store any data you enter.</div>
            <div><span className="font-semibold text-foreground">Fast &amp; lightweight —</span> No login walls, no paywalls, no bloat. Load a tool and get to work immediately.</div>
            <div><span className="font-semibold text-foreground">Always free —</span> Every tool on MyToolMate is free to use without limits. No credits, no tiers.</div>
            <div><span className="font-semibold text-foreground">Open web —</span> No installation required. Works on any modern browser on desktop or mobile.</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Who built this?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            MyToolMate was designed and built as a personal project to consolidate the scattered collection of online
            utilities developers reach for daily into one fast, trustworthy destination. The project is maintained
            independently and is not affiliated with any corporation or commercial product.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Get in touch</h2>
          <p className="text-sm text-muted-foreground">
            Found a bug or have a tool suggestion? Reach out at{" "}
            <a href="mailto:logixmagix@proton.me" className="text-primary hover:underline">logixmagix@proton.me</a>.
            Feedback is always welcome.
          </p>
        </div>
      </div>
    </div>
  );
}
