import useEditor from "./hooks/useEditor";

export default function MonacoEditor() {
  const [ editor, monacoEl ] = useEditor();

  console.log(editor);

  return <div style={{ height: "600px", width: "800px" }} ref={monacoEl}></div>
}