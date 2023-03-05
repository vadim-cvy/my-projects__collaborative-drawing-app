import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useDrawingBoardStore = defineStore('drawingBoard', () =>
{
  const
    _canvasElement = ref<HTMLElement | null>( null ),
    canvasElement = computed({
      get()
      {
        if ( _canvasElement.value === null )
        {
          throw new Error( 'Canvas element not found!' );
        }

        return _canvasElement.value
      },
      set( canvasElement: HTMLElement )
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

  const resolution = computed(() =>
  {
    const
      width = 1280,
      height = 720

    return {
      width,
      height,
      ratio: width / height,
    }
  })

  const orientation = computed(() => wrapperRatio.value > resolution.value.ratio ? 'horizontal' : 'vertical' )

  return {
    wrapperElement,
    canvasElement,
    wrapperRatio,
    resolution,
    orientation,
  }
})