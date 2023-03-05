<script lang="ts" setup>
  import DrawingTool from './DrawingTool.vue'
  import { ref } from 'vue'

  const drawingTools = {
    pencil: {
      label: 'Pencil',
    },
    brush: {
      label: 'Brush',
    },
  }

  const selectedTool = ref('pencil')
</script>

<template>
  <div class="tools-section">
    <h2 class="tools-section__title">
      Tools
    </h2>

    <div class="tools-list">
      <DrawingTool
        v-for="( tool, toolName ) in drawingTools"
        :key="toolName"
        v-model="selectedTool"
        :label="tool.label"
        :name="toolName"
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