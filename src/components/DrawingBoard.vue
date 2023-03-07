<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useDrawingBoardStore } from '@/stores/drawing-board/useDrawingBoardStore'
import { storeToRefs } from 'pinia'

const store = useDrawingBoardStore()

const {
  canvasElement,
  wrapperElement,
  orientation,
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

const initCanvas = () =>
{
  const canvas = canvasElement.value

  canvas.width = resolution.width
  canvas.height = resolution.height

  const ctx = canvas.getContext('2d')

  if ( ctx === null )
  {
    throw new Error( 'Context is not defined' )
  }

  let isDrawing = false

  canvas.addEventListener( 'mousedown', e =>
  {
    isDrawing = true

    draw( ctx, e )
  })

  canvas.addEventListener( 'mouseup', () => isDrawing = false )

  canvas.addEventListener( 'mousemove', e =>
  {
    if ( isDrawing )
    {
      draw( ctx, e )
    }
  })
}

// todo: ignores selected tool for now
const draw = ( ctx: CanvasRenderingContext2D, e: MouseEvent ) =>
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

  // todo: add ability to select
  ctx.fillStyle = 'blue'

  ctx.beginPath()
  ctx.arc(x, y, .5, 0, Math.PI * 2)
  ctx.fill()
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
  }
}
</style>