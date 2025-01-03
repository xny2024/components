import { RefObject, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "./userWorker";

type EditorType = monaco.editor.IStandaloneCodeEditor | null;

export default function useEditor(
  options?: monaco.editor.IStandaloneEditorConstructionOptions,
  override?: monaco.editor.IEditorOverrideServices,
): [EditorType, RefObject<HTMLDivElement | null>] {
  const [editor, setEditor] = useState<EditorType>(null);
  const monacoEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (monacoEl) {      
      setEditor((editor) => {
        if (editor && editor.getDomNode() !== null) {
          return editor;
        }

        return (
          monacoEl.current &&
          monaco.editor.create(
            monacoEl.current,
            options ?? {
              value: ["hello world"].join("\n"),
              language: "typescript",
              automaticLayout: true,
              inlineSuggest: {
                enabled: true,
              },
              mouseWheelZoom: true,
            },
            override,
          )
        );
      });
    }

    return () => {
      editor?.dispose();
    };
  }, [editor, options, override]);

  return [editor, monacoEl];
}
