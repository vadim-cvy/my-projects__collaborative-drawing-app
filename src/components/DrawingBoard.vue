<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDrawingBoardStore } from '@/stores/drawing-board/useDrawingBoardStore';
import { storeToRefs } from 'pinia';

const store = useDrawingBoardStore()

const {
  canvasElement,
  wrapperElement,
  orientation,
} = storeToRefs( store )

const
  canvasStyleWidth = ref(0),
  canvasStyleHeight = ref(0)

watch( () => store.wrapperRatio,
  () =>
  {
    if ( orientation.value === 'horizontal' )
    {
      canvasStyleHeight.value = wrapperElement.value.offsetHeight
      canvasStyleWidth.value = canvasStyleHeight.value * store.resolution.ratio
    }
    else if ( orientation.value === 'vertical' )
    {
      canvasStyleWidth.value = wrapperElement.value.offsetWidth
      canvasStyleHeight.value = canvasStyleWidth.value / store.resolution.ratio
    }
  }
)
</script>

<template>
  <div class="board">
    <canvas ref="canvasElement" :width="canvasStyleWidth" :height="canvasStyleHeight"></canvas>
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
    background-color: #fff;
  }
}
</style>