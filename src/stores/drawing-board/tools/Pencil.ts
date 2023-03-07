import { aDrawingTool } from "./aDrawingTool"

export class Pencil extends aDrawingTool
{
  public get name()
  {
    return 'pencil'
  }

  public get label()
  {
    return 'Pencil'
  }

  protected width = 5

  protected path = new Path2D()

  protected lastPoint: { x: number; y: number } | null = null

  public draw( x: number, y: number )
  {
    this.ctx.lineWidth = this.width
		this.ctx.strokeStyle = this.color

    if ( this.lastPoint === null )
    {
      this.path.moveTo(x, y)
    }
    else
    {
      this.path.quadraticCurveTo(
        this.lastPoint.x,
        this.lastPoint.y,
        // "( last point + cur point ) / 2" makes the curve smoother
        (this.lastPoint.x + x) / 2,
        (this.lastPoint.y + y) / 2
      )
    }

    this.ctx.stroke(this.path)

    this.lastPoint = { x, y }
  }

  public stop()
  {
    this.lastPoint = null
    this.path = new Path2D()
  }
}