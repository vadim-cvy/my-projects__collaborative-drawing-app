import aDrawingTool from "./aDrawingTool"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export abstract class aShape extends aDrawingTool
{
  public updatePath( point: tDrawingToolPoint )
  {
    this.stateHistory.restoreState()

    const firstPoint = this.points[0]

    const
      x1 = Math.min( firstPoint.x, point.x ),
      x2 = Math.max( firstPoint.x, point.x )

    const
      y1 = Math.min( firstPoint.y, point.y ),
      y2 = Math.max( firstPoint.y, point.y )

    const
      width = x2 - x1,
      height = y2 - y1

    const path = new Path2D()

    const leftTopPoint: tDrawingToolPoint = {
      x: x1,
      y: y1,
    }

    this.setShape( path, leftTopPoint, width, height )

    this.path = path
  }

  protected abstract setShape( path: Path2D, leftTopPoint: tDrawingToolPoint, width: number, height: number ) : void
}