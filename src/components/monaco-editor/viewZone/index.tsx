import { useEffect } from "react";
import useEditor from "../hooks/useEditor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { createRoot } from "react-dom/client";
import { Disposable, DisposableCollection } from "../../../utils/disposable";
import ViewZoneRender, { ZoneLayoutData } from "./viewZoneRender";

interface Props {
  viewZoneShow: boolean;
}

const zoneLayoutData: ZoneLayoutData = [
  {
    lineNumber: 1,
  },
  {
    lineNumber: 2,
  }
];

const App = (props: Props) => {
  const [editor, monacoEl] = useEditor();

  const { viewZoneShow } = props;
  
  useEffect(() => {
    const toDispose = new DisposableCollection()

    if (editor && viewZoneShow) {
      const zoneOptions: monaco.editor.IViewZone[] = [];
      let zoneIds: string[] = [];

      zoneLayoutData.forEach((zoneLineData) => {
        const div = document.createElement("div");

        zoneOptions.push({
          afterLineNumber: zoneLineData.lineNumber - 1,
          heightInLines: 1,
          domNode: div,
        })

        zoneLineData.lineDiv = div;
      })

      const root = createRoot(document.createElement("div"));

      // const fontSize = editor.getOption(monaco.editor.EditorOption.fontSize);
      // const multiplier = 1 + monaco.editor.EditorZoom.getZoomLevel() * 0.1;
      root.render(
        <ViewZoneRender zoneLayoutData={zoneLayoutData}></ViewZoneRender>
      )

      editor?.changeViewZones(changeAccessor => {
        zoneIds = zoneOptions.map(zoneOption => {
          return changeAccessor.addZone(zoneOption);
        })
      })

      toDispose.pushAll([
        Disposable.create(() => root.unmount()),
        Disposable.create(() => {
          editor?.changeViewZones((changeAccessor) => {
            zoneIds.forEach((zoneId) => changeAccessor.removeZone(zoneId))
          });
        }),
        editor.onDidContentSizeChange(() => {
          editor.changeViewZones(changeAccessor => {
            zoneIds.forEach((zoneId) => {
              changeAccessor.layoutZone(zoneId);
            })
          })
          // TODO 刷新数据
        })
      ]);
    }

    return () => {
      toDispose.dispose();
    }
  }, [editor, viewZoneShow])

  return <div style={{width: "600px", height: "600px"}} ref={monacoEl} />
}

export default App;