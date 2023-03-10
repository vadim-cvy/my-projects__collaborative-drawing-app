import type CanvasStateHistory from "@/components/drawing-board/inc/CanvasStateHistory"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export default abstract class aDrawingTool
{
  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected stateHistory: CanvasStateHistory
  ) {}

  public abstract get name() : string

  public abstract get label() : string

  protected path = new Path2D()

  public color: string = '#000'

  protected size = 5

  protected points: Array<tDrawingToolPoint> = []

  protected get pointsTotal()
  {
    return this.points.length
  }

  protected get lastPoint() : tDrawingToolPoint
  {
    if ( this.pointsTotal === 0 )
    {
      throw new Error( 'No points yet!' )
    }

    return this.points[this.points.length - 1]
  }

  public addPoint( x: number, y: number, isLastPoint: boolean ) : void
  {
    this.ctx.fillStyle = this.color
    this.ctx.lineWidth = this.size
    this.ctx.strokeStyle = this.color

    if (
      this.pointsTotal === 0 ||
      ( this.lastPoint.x !== x || this.lastPoint.y !== y )
    )
    {
      this.points.push({ x, y })

      this.updatePath( this.lastPoint )

      this.drawPath()
    }

    if ( isLastPoint )
    {
      this.stop()
    }
  }

  protected abstract updatePath( point: tDrawingToolPoint ) : void

  protected stop() : void
  {
    this.path = new Path2D()
    this.points = []
  }

  protected drawPath()
  {
    // console.log( 'aDrawingTool::drawPath' )

    this.ctx.stroke( this.path )
  }
}