export abstract class aDrawingTool
{
  public abstract get name() : string

  public abstract get label() : string

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

  public abstract draw( x: number, y: number ) : void

  public abstract stop() : void
}