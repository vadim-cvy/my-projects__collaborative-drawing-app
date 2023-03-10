import { defineStore } from 'pinia'
import { ref, computed, watch, readonly } from 'vue'
import CanvasStateHistory from './inc/CanvasStateHistory';
import { Pencil } from './inc/tools/Pencil';
import { Rectangle } from './inc/tools/Rectangle';

export const useDrawingBoardStore = defineStore('drawingBoard', () =>
{
  const
    _canvasElement = ref<HTMLCanvasElement | null>( null ),
    canvasElement = computed({
      get()
      {
        if ( _canvasElement.value === null )
        {
          throw new Error( 'Canvas element not found!' );
        }

        return _canvasElement.value
      },
      set( canvasElement: HTMLCanvasElement )
      {
        _canvasElement.value = canvasElement
      }
    });

  const wrapperElement = computed(() =>
  {
    const wrapperElement = canvasElement.value.parentElement

    if ( wrapperElement === null )
    {
      throw new Error( 'Wrapper element not found!' );
    }

    return wrapperElement
  })

  const wrapperRatio = ref( 0 )

  const syncWrapperRatio = () =>
    wrapperRatio.value = wrapperElement.value.offsetWidth / wrapperElement.value.offsetHeight

  watch( _canvasElement, syncWrapperRatio )

  window.onresize = () => _canvasElement.value ? syncWrapperRatio() : undefined

  const resolution = {
    width: 1280,
    height: 720,

    get ratio()
    {
      return this.width / this.height
    }
  }

  const orientation = computed(() => wrapperRatio.value > resolution.ratio ? 'horizontal' : 'vertical' )

  const tools = [
    new Pencil(),
    new Rectangle(),
  ]

  const stateHistory = new CanvasStateHistory()

  watch( _canvasElement, () =>
  {
    const canvas = canvasElement.value

    const ctx = canvas.getContext('2d')

    if ( ctx === null )
    {
      throw new Error( 'Can\'t get canvas context!' )
    }

    stateHistory.canvas = canvas
    stateHistory.ctx = ctx

    tools.forEach( tool =>
    {
      tool.ctx = ctx

      // todo: add ability to select
      tool.color = '#000'

      tool.stateHistory = stateHistory
    })
  })

  const
    selectedToolIndex = ref( 0 ),
    selectedTool = computed(() => tools[ selectedToolIndex.value ] )

  return {
    wrapperElement,
    canvasElement,
    wrapperRatio,
    resolution,
    orientation,
    tools,
    selectedToolIndex,
    selectedTool,
    stateHistory,
  }
})