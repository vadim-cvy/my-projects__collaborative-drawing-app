<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useDrawingBoardStore } from '@/stores/drawing-board/useDrawingBoardStore'
import { storeToRefs } from 'pinia'

const store = useDrawingBoardStore()

const {
  canvasElement,
  wrapperElement,
  orientation,
  selectedTool,
} = storeToRefs( store )

const resolution = store.resolution

const canvasSize = ref({
  height: 0,
  width: 0,
})

watch( () => store.wrapperRatio, () =>
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

let isDrawing = false

const initCanvas = () =>
{
  const canvas = canvasElement.value

  canvas.width = resolution.width
  canvas.height = resolution.height

  canvas.addEventListener( 'mousedown', e =>
  {
    isDrawing = true
    draw( e )
  })

  canvas.addEventListener( 'mouseup', stopDrawing )
  canvas.addEventListener( 'mouseout', stopDrawing )

  canvas.addEventListener( 'mousemove', e => isDrawing ? draw( e ) : undefined )
}

const draw = ( e: MouseEvent ) =>
{
  if ( e.target === null || ! ( e.target instanceof Element ) )
  {
    throw new Error( 'Can\'t detect event target!' )
  }

  const sizeToResolutionRatio = Number(
    ( canvasSize.value.width / resolution.width ).toFixed( 5 )
  )

  const
    rect = e.target.getBoundingClientRect(),
    x = ( e.clientX - rect.left ) / sizeToResolutionRatio,
    y = ( e.clientY - rect.top ) / sizeToResolutionRatio

  selectedTool.value.draw( x, y )
}

const stopDrawing = ( e: MouseEvent ) =>
{
  if ( ! isDrawing )
  {
    return
  }

  draw( e )

  isDrawing = false
  selectedTool.value.stop()
}

onMounted( initCanvas )

watch( () => store.wrapperRatio, () =>
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