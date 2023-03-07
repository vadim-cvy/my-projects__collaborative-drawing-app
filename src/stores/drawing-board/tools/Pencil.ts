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

  public draw( x: number, y: number )
  {
    // todo: add ability to select
    this.ctx.fillStyle = 'blue'

    this.ctx.beginPath()
    this.ctx.arc(x, y, 4, 0, Math.PI * 2)
    this.ctx.fill()
  }

  public stop()
  {

  }
}