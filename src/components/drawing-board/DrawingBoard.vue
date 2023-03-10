<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDrawingBoardStore } from '@/stores/useDrawingBoardStore';

const store = useDrawingBoardStore()

const {
  canvasElement,
  wrapperElement,
  orientation,
  selectedTool,
  wrapperRatio,
} = storeToRefs( store )

const {
  resolution,
  stateHistory
} = store

const canvasSize = ref({
  height: 0,
  width: 0,
})

watch( wrapperRatio, () =>
{
  const size = canvasSize.value

  if ( orientation.value === 'horizontal' )
  {
    size.height = wrapperElement.value.offsetHeight
    size.width = size.height * resolution.ratio
  }
  else if ( orientation.value === 'vertical' )
  {
    size.width = wrapperElement.value.offsetWidth
    size.height = size.width / resolution.ratio
  }
})

watch( canvasSize,
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

const startDrawing = ( e: MouseEvent ) => stateHistory.saveState(() =>
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

  const sizeToResolutionRatio = Number(
    ( canvasSize.value.width / resolution.width ).toFixed( 5 )
  )

  const
    rect = e.target.getBoundingClientRect(),
    x = Math.round( ( e.clientX - rect.left ) / sizeToResolutionRatio ),
    y = Math.round( ( e.clientY - rect.top ) / sizeToResolutionRatio )

  selectedTool.value.addPoint( x, y, isLastPoint )
}

onMounted( initCanvas )

watch( wrapperRatio, () =>
{
  const cssDimensions = canvasSize.value

  if ( orientation.value === 'horizontal' )
  {
    cssDimensions.height = wrapperElement.value.offsetHeight
    cssDimensions.width = cssDimensions.height * resolution.ratio
  }
  else if ( orientation.value === 'vertical' )
  {
    cssDimensions.width = wrapperElement.value.offsetWidth
    cssDimensions.height = cssDimensions.width / resolution.ratio
  }
})
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