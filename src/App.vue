<script setup lang="ts">
import DrawingBoard from './components/drawing-board/DrawingBoard.vue';
import DrawingTools from './components/drawing-tools/DrawingTools.vue';
</script>

<template>
  <div class="drawing-wrapper">
    <DrawingTools></DrawingTools>
    <DrawingBoard></DrawingBoard>
  </div>
</template>

<style scoped lang="scss">
.drawing-wrapper
{
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
}
</style>