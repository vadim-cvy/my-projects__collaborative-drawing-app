import aDrawingTool from "./aDrawingTool"
import type tDrawingToolPoint from "./tDrawingToolPoint"

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

  public updatePath( point: tDrawingToolPoint, type: 'curve' | 'straightLine' | 'dot' = 'curve' )
  {
    if ( type === 'dot' )
    {
      this.path.arc( point.x, point.y, this.size / 4, 0, Math.PI * 2 )
    }
    else if ( this.pointsTotal === 1 )
    {
      this.path.moveTo( point.x, point.y )
    }
    else if ( type === 'curve' )
    {
      this.path.quadraticCurveTo(
        this.lastPoint.x,
        this.lastPoint.y,
        // "( last point + cur point ) / 2" makes the curve smoother
        (this.lastPoint.x + point.x) / 2,
        (this.lastPoint.y + point.y) / 2
      )
    }
    else if ( type === 'straightLine' )
    {
      this.path.lineTo( point.x, point.y )
    }
  }

  protected stop()
  {
    this.updatePath( this.lastPoint, this.pointsTotal > 1 ? 'straightLine' : 'dot' )
    this.drawPath()

    super.stop()
  }
}