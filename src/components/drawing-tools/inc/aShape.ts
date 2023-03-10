import aDrawingTool from "./aDrawingTool"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export abstract class aShape extends aDrawingTool
{
  public updatePath( point: tDrawingToolPoint )
  {
    this.stateHistory.restoreState()

    const firstPoint = this.points[0]

    const
      startPoint = this.getStartPoint( firstPoint, point ),
      endPoint = this.getEndPoint( firstPoint, point )

    const
      width = Math.max( startPoint.x, endPoint.x ) - Math.min( startPoint.x, endPoint.x ),
      height = Math.max( startPoint.y, endPoint.y ) - Math.min( startPoint.y, endPoint.y )

    const path = new Path2D()

    this.setShape( path, startPoint, endPoint, width, height )

    this.path = path
  }

  protected abstract setShape(
    path: Path2D,
    startPoint: tDrawingToolPoint,
    endPoint: tDrawingToolPoint,
    width: number,
    height: number
  ) : void

  protected getStartPoint( a: tDrawingToolPoint, b: tDrawingToolPoint ) : tDrawingToolPoint
  {
    return {
      x: Math.min( a.x, b.x ),
      y: Math.min( a.y, b.y ),
    }
  }

  protected getEndPoint( a: tDrawingToolPoint, b: tDrawingToolPoint ) : tDrawingToolPoint
  {
    return {
      x: Math.max( a.x, b.x ),
      y: Math.max( a.y, b.y ),
    }
  }
}