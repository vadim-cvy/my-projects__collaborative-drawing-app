<script lang="ts" setup>
import { useDrawingBoardStore } from '@/stores/useDrawingBoardStore';
import { storeToRefs } from 'pinia';
import { Pencil } from './inc/Pencil';
import { Rectangle } from './inc/Rectangle';
import { ref, watch } from 'vue';
import type aDrawingTool from './inc/aDrawingTool';
import DrawingTool from './DrawingTool.vue';
import { Elipse } from './inc/Elipse';

const store = useDrawingBoardStore()

const {
  isStateHistorySet,
  canvasContext,
  selectedTool,
  stateHistory,
} = storeToRefs( store )

const tools = ref<Array<aDrawingTool>>( [] )

const selectedToolIndex = ref( 0 )

watch( isStateHistorySet, () =>
{
  tools.value.push( new Pencil( canvasContext.value, stateHistory.value ) )
  tools.value.push( new Rectangle( canvasContext.value, stateHistory.value ) )
  tools.value.push( new Elipse( canvasContext.value, stateHistory.value ) )

  selectedTool.value = tools.value[ selectedToolIndex.value ]
})

watch( selectedToolIndex, () => selectedTool.value = tools.value[ selectedToolIndex.value ] )
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