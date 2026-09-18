export default function CookiePolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: September 2026</p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device by your browser when you visit a website. They are widely used to make websites work efficiently and to provide information to site owners.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Cookies We Use</h2>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-4 py-2 font-medium">Cookie</th>
                  <th className="text-left px-4 py-2 font-medium">Type</th>
                  <th className="text-left px-4 py-2 font-medium">Purpose</th>
                  <th className="text-left px-4 py-2 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono">__vercel_live_token</td>
                  <td className="px-4 py-2">Technical</td>
                  <td className="px-4 py-2">Required by Vercel hosting infrastructure</td>
                  <td className="px-4 py-2">Session</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">_va (Vercel Analytics)</td>
                  <td className="px-4 py-2">Analytics</td>
                  <td className="px-4 py-2">Anonymised page-view tracking — no personal data</td>
                  <td className="px-4 py-2">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">We do <strong className="text-foreground">not</strong> use advertising cookies, third-party tracking cookies, or any cookie that identifies you personally.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Local Storage</h2>
          <p>Some tools may store your preferences (e.g., last-used settings) in your browser's <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage</code>. This data never leaves your device and is not accessible to us.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">How to Control Cookies</h2>
          <p>You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of some features. For guidance, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">allaboutcookies.org</a>.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Contact</h2>
          <p>Questions about our cookie use? Email <a href="mailto:logixmagix@proton.me" className="text-primary hover:underline">logixmagix@proton.me</a>.</p>
        </section>
      </div>
    </div>
  );
}
