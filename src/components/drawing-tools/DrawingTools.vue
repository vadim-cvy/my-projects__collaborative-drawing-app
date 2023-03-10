<script lang="ts" setup>
  import DrawingTool from './DrawingTool.vue'
  import { useDrawingBoardStore } from '@/stores/useDrawingBoardStore';
  import { storeToRefs } from 'pinia';

  const store = useDrawingBoardStore()

  const { tools } = store

  const { selectedToolIndex } = storeToRefs( store )
</script>

<template>
  <div class="tools-section">
    <h2 class="tools-section__title">
      Tools
    </h2>

    <div class="tools-list">
      <DrawingTool
        v-for="( tool, i ) in tools"
        :key="tool.name"
        :tool="tool"
        :is-selected="selectedToolIndex === i"
        @click="selectedToolIndex = i"
      ></DrawingTool>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tools
{
  &-section
  {
    padding: .5em;
    border-right: 1px solid var(--markup-lines-color);

    &__title
    {
      margin-bottom: .8em;
      font: inherit;
      text-align: center;
    }
  }

  &-list
  {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1em;
  }
}
</style>