import { createPortal } from "react-dom";

export type ZoneLayoutData = ZoneLineData[];

export type ZoneLineData = {
  lineNumber: number;
  lineDiv?: HTMLElement;
}



const ViewZoneRender = (props: {
  zoneLayoutData: ZoneLayoutData;
}) => {

  const { zoneLayoutData } = props;

  return (
    <>
      {
        zoneLayoutData.map((zoneLineData) => {
          return createPortal(
            <>
              {zoneLineData.lineNumber}
            </>,
            zoneLineData.lineDiv!,
          )
        })
      }
    </>
  )
}

export default ViewZoneRender;