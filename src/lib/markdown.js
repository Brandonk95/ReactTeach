import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('xml', xml);

const ALIASES = { js: 'javascript', jsx: 'javascript', py: 'python', html: 'xml' };

export function highlight(code, lang) {
  const language = ALIASES[lang] || lang;
  if (language && hljs.getLanguage(language)) return hljs.highlight(code, { language }).value;
  return escapeHtml(code);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const block = (code, lang) => `<pre class="code"><code class="hljs">${highlight(code, lang)}</code></pre>`;

const marked = new Marked({
  renderer: {
    // ```compare blocks hold Python, a "////" line, then JavaScript.
    code({ text, lang }) {
      if (lang === 'compare') {
        const [py, js = ''] = text.split(/^\/\/\/\/\s*$/m);
        return `<div class="compare">
  <div class="compare-col"><div class="compare-label py">🐍 Python</div>${block(py.replace(/\n+$/, ''), 'python')}</div>
  <div class="compare-col"><div class="compare-label js">⚡ JavaScript</div>${block(js.replace(/^\n+/, ''), 'javascript')}</div>
</div>`;
      }
      return block(text, lang || 'javascript');
    },
    // Show raw HTML like "<h1>" as text: lesson prose talks about tags a lot.
    html({ text }) {
      return escapeHtml(text);
    },
    link({ href, text }) {
      return `<a href="${href}" target="_blank" rel="noreferrer">${text}</a>`;
    },
  },
});

export const renderMarkdown = (md) => marked.parse(md || '');
export const renderInline = (md) => marked.parseInline(md || '');
