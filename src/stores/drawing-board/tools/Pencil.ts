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

  protected pointsTotal = 0

  protected lastPoint: { x: number; y: number } | null = null

  public draw( x: number, y: number, type: 'curve' | 'straight' | 'dot' = 'curve' )
  {
    if ( type === 'dot' )
    {
      this.ctx.fillStyle = 'black'

      this.path.arc( x, y, this.width / 4, 0, Math.PI * 2 )
    }
    else
    {
      this.ctx.lineWidth = this.width
      this.ctx.strokeStyle = this.color

      if ( this.lastPoint === null )
      {
        this.path.moveTo(x, y)
      }
      else if ( type === 'curve' )
      {
        this.path.quadraticCurveTo(
          this.lastPoint.x,
          this.lastPoint.y,
          // "( last point + cur point ) / 2" makes the curve smoother
          (this.lastPoint.x + x) / 2,
          (this.lastPoint.y + y) / 2
        )
      }
      else if ( type === 'straight' )
      {
        this.path.lineTo( x, y )
      }
    }

    this.ctx.stroke( this.path )

    this.lastPoint = { x, y }

    this.pointsTotal++
  }

  public stop()
  {
    if ( this.lastPoint )
    {
      this.draw(
        this.lastPoint.x,
        this.lastPoint.y,
        this.pointsTotal <= 2 ? 'dot' : 'straight',
      )
    }

    this.lastPoint = null
    this.path = new Path2D()
    this.pointsTotal = 0
  }
}