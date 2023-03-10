import { aShape } from "./aShape"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export class Line extends aShape
{
  public get name()
  {
    return 'line'
  }

  public get label()
  {
    return 'Line'
  }

  protected setShape( path: Path2D, startPoint: tDrawingToolPoint, endPoint: tDrawingToolPoint )
  {
    path.moveTo( startPoint.x, startPoint.y )

    path.lineTo( endPoint.x, endPoint.y )
  }

  protected getStartPoint( a: tDrawingToolPoint, b: tDrawingToolPoint ) : tDrawingToolPoint
  {
    return a
  }

  protected getEndPoint( a: tDrawingToolPoint, b: tDrawingToolPoint ) : tDrawingToolPoint
  {
    return b
  }
}