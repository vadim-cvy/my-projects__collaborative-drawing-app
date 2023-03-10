
import type CanvasStateHistory from "../CanvasStateHistory"
import type tDrawingToolPoint from "./tDrawingToolPoint"

export default abstract class aDrawingTool
{
  public abstract get name() : string

  public abstract get label() : string

  protected _stateHistory: CanvasStateHistory | null = null

  public set stateHistory( stateHistory: CanvasStateHistory )
  {
    this._stateHistory = stateHistory
  }

  public get stateHistory() : CanvasStateHistory
  {
    if ( this._stateHistory === null )
    {
      throw new Error( 'State history is not set!' )
    }

    return this._stateHistory
  }

  protected path = new Path2D()

  protected _ctx: CanvasRenderingContext2D | null = null

  public set ctx( ctx: CanvasRenderingContext2D )
  {
    this._ctx = ctx
  }

  public get ctx() : CanvasRenderingContext2D
  {
    if ( this._ctx === null )
    {
      throw new Error( 'Rendering context is not set!' )
    }

    return this._ctx
  }

  protected _color: string | null = null

  public get color() : string
  {
    if ( this._color === null )
    {
      throw new Error( 'Color is not set!' )
    }

    return this._color
  }

  public set color( color: string )
  {
    this._color = color
  }

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