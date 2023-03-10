import type CanvasStateHistory from "../CanvasStateHistory"
import aDrawingTool from "./aDrawingTool"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export class Rectangle extends aDrawingTool
{
  public get name()
  {
    return 'rectangle'
  }

  public get label()
  {
    return 'Rectangle'
  }

  public updatePath( point: tDrawingToolPoint )
  {
    this.stateHistory.restoreState()

    this.path = new Path2D

    const firstPoint = this.points[0]

    const
      x1 = Math.min( firstPoint.x, point.x ),
      x2 = Math.max( firstPoint.x, point.x )

    const
      y1 = Math.max( firstPoint.y, point.y ),
      y2 = Math.min( firstPoint.y, point.y )

    const
      width = x2 - x1,
      height = y2 - y1

    this.path.rect( x1, y1, width, height )
  }

  protected stop()
  {
    super.stop()
  }
}