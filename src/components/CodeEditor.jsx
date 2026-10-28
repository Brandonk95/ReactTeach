import { useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { acceptCompletion } from '@codemirror/autocomplete';

export function usePrefersDark() {
  const query = '(prefers-color-scheme: dark)';
  const [dark, setDark] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setDark(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return dark;
}

export function CodeEditor({ value, onChange, onRun, onCheck, readOnly = false, height = '100%' }) {
  const dark = usePrefersDark();
  // Handlers live in a ref so the keymap extension is created once.
  const handlers = useRef({});
  handlers.current = { onRun, onCheck };

  const extensions = useMemo(
    () => [
      javascript({ jsx: true }),
      Prec.highest(
        keymap.of([
          // Tab accepts the open autocomplete suggestion; otherwise it falls through to indenting.
          { key: 'Tab', run: acceptCompletion },
          { key: 'Mod-Enter', run: () => (handlers.current.onRun?.(), true) },
          { key: 'Mod-Shift-Enter', run: () => (handlers.current.onCheck?.(), true) },
          { key: 'Mod-s', run: () => (handlers.current.onCheck?.(), true), preventDefault: true },
        ]),
      ),
    ],
    [],
  );

  return (
    <CodeMirror
      className="code-editor"
      value={value}
      height={height}
      theme={dark ? 'dark' : 'light'}
      readOnly={readOnly}
      editable={!readOnly}
      extensions={extensions}
      onChange={onChange}
      basicSetup={{ tabSize: 2, foldGutter: false, highlightActiveLine: !readOnly }}
      indentWithTab
    />
  );
}
