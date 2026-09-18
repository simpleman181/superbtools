export default function Disclaimer() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Disclaimer</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: September 2026</p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">General Disclaimer</h2>
          <p>The tools, information, and content available on MyToolMate (<span className="text-foreground font-medium">www.mytoolmate.top</span>) are provided for general informational and utility purposes only. While we strive to keep all tools accurate and functional, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the output for any specific purpose.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">No Professional Advice</h2>
          <p>Nothing on MyToolMate constitutes professional legal, financial, medical, security, or technical advice. Tools such as the EMI calculator, hash generator, password generator, or certificate decoder are provided for informational and educational purposes only. Always consult a qualified professional before making decisions based on tool output.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Security Tools</h2>
          <p>Tools that generate passwords, hashes, or encryption keys are provided as utilities. We do not guarantee the cryptographic strength of any output for your specific use case. Do not rely solely on these tools for security-critical applications without independent validation.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">External Services</h2>
          <p>Certain tools (such as IP Lookup or DNS Checker) rely on third-party APIs. We are not responsible for the accuracy, availability, or changes to these external services. Results may vary or become unavailable if the underlying service changes.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Limitation of Liability</h2>
          <p>MyToolMate and its operators shall not be held liable for any loss, damage, or inconvenience arising from the use of or reliance on any tool, output, or information provided on this site. Use all tools at your own risk.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Contact</h2>
          <p>If you have concerns about any tool or its output, contact us at <a href="mailto:logixmagix@proton.me" className="text-primary hover:underline">logixmagix@proton.me</a>.</p>
        </section>
      </div>
    </div>
  );
}
