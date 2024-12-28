import useEditor from "../../components/monaco-editor/hooks/useEditor";

export default function MonacoEditor() {
  const [ editor, monacoEl ] = useEditor();

  return <div style={{ height: "600px", width: "800px" }} ref={monacoEl}></div>
}