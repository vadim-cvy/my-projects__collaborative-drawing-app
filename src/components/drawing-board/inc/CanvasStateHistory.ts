export default class CanvasStateHistory
{
  protected savedState: HTMLImageElement | null = null

  constructor(
    protected canvas: HTMLCanvasElement,
    protected ctx: CanvasRenderingContext2D
  ) {}

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