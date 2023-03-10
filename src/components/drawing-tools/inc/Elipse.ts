import { aShape } from "./aShape"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export class Elipse extends aShape
{
  public get name()
  {
    return 'elipse'
  }

  public get label()
  {
    return 'Elipse'
  }

  protected setShape(
    path: Path2D,
    startPoint: tDrawingToolPoint,
    endPoint: tDrawingToolPoint,
    width: number,
    height: number
  )
  {
    const
      radiusX = width / 2,
      radiusY = height / 2

    const
      xCenter = startPoint.x + radiusX,
      yCenter = startPoint.y + radiusY

    path.ellipse(
      xCenter,
      yCenter,
      radiusX,
      radiusY,
      0,
      0,
      2 * Math.PI
    )
  }
}