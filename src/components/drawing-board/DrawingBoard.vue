<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDrawingBoardStore } from '@/stores/useDrawingBoardStore';
import CanvasStateHistory from './inc/CanvasStateHistory';

const store = useDrawingBoardStore()

const {
  isCanvasElementSet,
  canvasElement,
  canvasContext,
  orientation,
  selectedTool,
  stateHistory,
} = storeToRefs( store )

watch( isCanvasElementSet,
  () => stateHistory.value = new CanvasStateHistory( canvasElement.value, canvasContext.value )
)

const resolution = {
  width: 1280,
  height: 720,

  get ratio()
  {
    return this.width / this.height
  }
}

const wrapperElement = computed(() =>
{
  const wrapperElement = canvasElement.value.parentElement

  if ( ! wrapperElement )
  {
    throw new Error( 'Wrapper element not found!' );
  }

  return wrapperElement
})

const wrapperRatio = ref( 0 )

const syncWrapperRatio = () =>
  wrapperRatio.value = wrapperElement.value.offsetWidth / wrapperElement.value.offsetHeight

watch( isCanvasElementSet, syncWrapperRatio )

window.onresize = () => isCanvasElementSet.value ? syncWrapperRatio() : undefined

watch( wrapperRatio, () => orientation.value = wrapperRatio.value > resolution.ratio ? 'horizontal' : 'vertical' )

const size = ref({
  height: 0,
  width: 0,
})

watch(
  () => wrapperRatio.value && orientation.value,
  () =>
  {
    const s = size.value

    if ( orientation.value === 'horizontal' )
    {
      s.height = wrapperElement.value.offsetHeight
      s.width = s.height * resolution.ratio
    }
    else if ( orientation.value === 'vertical' )
    {
      s.width = wrapperElement.value.offsetWidth
      s.height = s.width / resolution.ratio
    }
  }
)

watch( size,
  size =>
  {
    canvasElement.value.style.width = size.width + 'px'
    canvasElement.value.style.height = size.height + 'px'
  },
  {
    deep: true,
  }
)

const initCanvas = () =>
{
  const canvas = canvasElement.value

  canvas.width = resolution.width
  canvas.height = resolution.height

  canvas.addEventListener( 'mousedown', startDrawing )
}

const startDrawing = ( e: MouseEvent ) => stateHistory.value.saveState(() =>
{
  // console.log( 'DrawingBoard::startDrawing' )

  const canvas = canvasElement.value

  drawPoint( e )

  canvas.addEventListener( 'mousemove', drawPoint )

  canvas.addEventListener( 'mouseup', stopDrawing )
  canvas.addEventListener( 'mouseout', stopDrawing )
})

const stopDrawing = ( e: MouseEvent ) =>
{
  // console.log( 'DrawingBoard::stopDrawing' )

  const canvas = canvasElement.value

  drawPoint( e, true )

  canvas.removeEventListener( 'mousemove', drawPoint )

  canvas.removeEventListener( 'mouseup', stopDrawing )
  canvas.removeEventListener( 'mouseout', stopDrawing )
}

const drawPoint = ( e: MouseEvent, isLastPoint: boolean = false ) =>
{
  // console.log( 'DrawingBoard::drawPoint' )

  if ( e.target === null || ! ( e.target instanceof Element ) )
  {
    throw new Error( 'Can\'t detect event target!' )
  }

  const sizeToresolutionRatio = Number(
    ( size.value.width / resolution.width ).toFixed( 5 )
  )

  const
    rect = e.target.getBoundingClientRect(),
    x = Math.round( ( e.clientX - rect.left ) / sizeToresolutionRatio ),
    y = Math.round( ( e.clientY - rect.top ) / sizeToresolutionRatio )

  selectedTool.value.addPoint( x, y, isLastPoint )
}

onMounted( initCanvas )
</script>

<template>
  <div class="board">
    <canvas ref="canvasElement"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.board
{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  canvas
  {
    width: 0;
    height: 0;
    background-color: #fff;
    cursor: pointer;
  }
}
</style>