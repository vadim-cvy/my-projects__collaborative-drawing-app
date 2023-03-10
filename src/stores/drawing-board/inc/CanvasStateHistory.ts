export default class CanvasStateHistory
{
  protected savedState: HTMLImageElement | null = null

  protected _canvas: HTMLCanvasElement | null = null

  public get canvas() : HTMLCanvasElement
  {
    if ( ! this._canvas )
    {
      throw new Error( 'Canvas is not set!' )
    }

    return this._canvas
  }

  public set canvas( canvas: HTMLCanvasElement )
  {
    this._canvas = canvas
  }

  protected _ctx: CanvasRenderingContext2D | null = null

  public get ctx() : CanvasRenderingContext2D
  {
    if ( ! this._ctx )
    {
      throw new Error( 'Rendering context is not set!' )
    }

    return this._ctx
  }

  public set ctx( ctx: CanvasRenderingContext2D )
  {
    this._ctx = ctx
  }

  public saveState( onSaved: () => void )
  {
    // console.log( 'CanvasStateHistory::saveState' )

    this.savedState = new Image()

    this.savedState.onload = onSaved

    this.savedState.src = this.canvas.toDataURL()
  }

  public restoreState()
  {
    // console.log( 'CanvasStateHistory::restoreState' )

    if ( this.savedState )
    {
      this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height )

      this.ctx.drawImage( this.savedState, 0, 0 )
    }
  }
}