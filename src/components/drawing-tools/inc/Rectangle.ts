import { aShape } from "./aShape"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export class Rectangle extends aShape
{
  public get name()
  {
    return 'rectangle'
  }

  public get label()
  {
    return 'Rectangle'
  }

  protected setShape( path: Path2D, leftTopPoint: tDrawingToolPoint, width: number, height: number )
  {
    path.rect( leftTopPoint.x, leftTopPoint.y, width, height )
  }
}