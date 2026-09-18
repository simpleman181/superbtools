'use client';
import { useState } from "react";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const subj = encodeURIComponent(subject || "MyToolMate Enquiry");
    window.location.href = `mailto:logixmagix@proton.me?subject=${subj}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </div>
      <p className="text-muted-foreground mb-8">Bug reports, tool suggestions, or general feedback — we read everything.</p>

      <div className="rounded-xl border bg-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Direct email</span>
        </div>
        <a href="mailto:logixmagix@proton.me" className="text-primary hover:underline text-sm">logixmagix@proton.me</a>
        <p className="text-xs text-muted-foreground mt-1">We typically respond within 48 hours.</p>
      </div>

      {sent ? (
        <div className="rounded-xl border bg-card p-8 flex flex-col items-center gap-3 text-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
          <h2 className="font-semibold">Your email client has opened!</h2>
          <p className="text-sm text-muted-foreground">Send the email from your email client to reach us. We will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Name</label>
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                placeholder="Your name"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                placeholder="your@email.com"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Subject</label>
            <input value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))}
              placeholder="Bug report / Tool suggestion / Other"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Message</label>
            <textarea required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
              placeholder="Describe your issue or suggestion in detail..."
              rows={5}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit"
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            Open in Email Client
          </button>
          <p className="text-xs text-center text-muted-foreground">This opens your default email app with the form pre-filled.</p>
        </form>
      )}
    </div>
  );
}
