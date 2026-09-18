export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: September 2026</p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Overview</h2>
          <p>MyToolMate ("we", "us", "our") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information when you use our website at <span className="text-foreground font-medium">www.mytoolmate.top</span>.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Data We Do Not Collect</h2>
          <p className="mb-2">All tools on MyToolMate run <strong className="text-foreground">entirely in your browser</strong>. The following data is never transmitted to our servers:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Any text, code, files, or data you enter into any tool</li>
            <li>Uploaded images, PDFs, or other files</li>
            <li>Passwords, keys, or tokens you paste into security tools</li>
            <li>IP addresses (beyond standard web server logs, see below)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Data We Do Collect</h2>
          <p className="mb-2">We collect minimal, anonymised data to understand how the site is used:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Analytics:</strong> Page views and general usage patterns via Vercel Web Analytics. This data is aggregated and does not identify individual users.</li>
            <li><strong className="text-foreground">Server logs:</strong> Our hosting provider (Vercel) may log standard HTTP request data such as IP addresses, request paths, and timestamps. These logs are retained per Vercel's own privacy policy and are not used by us for tracking.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Cookies</h2>
          <p>MyToolMate does not set any first-party tracking or advertising cookies. For details on technical cookies used, see our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Third-Party Services</h2>
          <p>Some tools make requests to third-party APIs (for example, IP lookup uses public geolocation APIs). These are clearly identified in the tool. In such cases, the third party's privacy policy applies to that request.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Children's Privacy</h2>
          <p>MyToolMate is not directed at children under 13. We do not knowingly collect personal information from children.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">7. Changes to This Policy</h2>
          <p>We may update this policy from time to time. The "Last updated" date at the top of this page will reflect any changes. Continued use of the site constitutes acceptance of the updated policy.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">8. Contact</h2>
          <p>For any privacy-related questions, contact us at <a href="mailto:logixmagix@proton.me" className="text-primary hover:underline">logixmagix@proton.me</a>.</p>
        </section>
      </div>
    </div>
  );
}
