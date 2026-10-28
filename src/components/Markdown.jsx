import { useMemo } from 'react';
import { renderInline, renderMarkdown } from '../lib/markdown.js';

export function Markdown({ text, className = '' }) {
  const html = useMemo(() => renderMarkdown(text), [text]);
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function InlineMarkdown({ text, as: Tag = 'span' }) {
  const html = useMemo(() => renderInline(text), [text]);
  return <Tag dangerouslySetInnerHTML={{ __html: html }} />;
}
