'use client';
"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const defaultMarkdown = `# Welcome to Markdown Previewer

## Features
- **Bold** and *italic* text
- [Links](https://example.com)
- \`inline code\`

\`\`\`js
// Code blocks
function hello() {
  return "world";
}
\`\`\`

| Table | Col 2 |
|-------|-------|
| A     | B     |

> Blockquote

1. Ordered list
2. Second item

---
`;

export default function MarkdownPreviewer() {
  const [input, setInput] = useState(defaultMarkdown);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Markdown Previewer</h1>
          <p className="text-sm text-muted-foreground">Split-screen live Markdown rendering</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Markdown Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Preview</label>
          <div className="flex-1 rounded-md border bg-card px-4 py-3 overflow-auto prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
