import type CanvasStateHistory from '@/components/drawing-board/inc/CanvasStateHistory';
import type aDrawingTool from '@/components/drawing-tools/inc/aDrawingTool';
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useDrawingBoardStore = defineStore('drawingBoard', () =>
{
  const
    _canvasElement = ref<HTMLCanvasElement | null>( null ),
    isCanvasElementSet = computed(() => !! _canvasElement.value ),
    canvasElement = computed({
      get()
      {
        if ( ! _canvasElement.value )
        {
          throw new Error( 'Canvas element not found!' );
        }

        return _canvasElement.value
      },
      set( canvasElement: HTMLCanvasElement )
      {
        _canvasElement.value = canvasElement
      }
    })

  const canvasContext = computed(() =>
  {
    const ctx = canvasElement.value.getContext( '2d' )

    if ( ! ctx )
    {
      throw new Error( 'Can\'t get canvas context!' )
    }

    return ctx
  })

  const
    _stateHistory = ref<CanvasStateHistory | null>( null ),
    isStateHistorySet = computed(() => !! _stateHistory.value ),
    stateHistory = computed({
      get()
      {
        if ( ! _stateHistory.value )
        {
          throw new Error( 'State history is not set!' );
        }

        return _stateHistory.value
      },
      set( stateHistory )
      {
        _stateHistory.value = stateHistory
      }
    })

  const
    _selectedTool = ref<aDrawingTool | null>( null ),
    selectedTool = computed({
      get()
      {
        if ( ! _selectedTool.value )
        {
          throw new Error( 'No tool is selected!' );
        }

        return _selectedTool.value
      },
      set( selectedTool )
      {
        _selectedTool.value = selectedTool
      }
    })

  const orientation = ref<'horizontal' | 'vertical' | null>( null )

  return {
    canvasElement,
    isCanvasElementSet,
    canvasContext,

    isStateHistorySet,
    stateHistory,

    orientation,

    selectedTool,
  }
})