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

  public abstract draw( x: number, y: number ) : void

  public abstract stop() : void
}