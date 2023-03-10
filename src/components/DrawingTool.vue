<script lang="ts" setup>
import aDrawingTool from '@/stores/drawing-board/inc/tools/aDrawingTool';

defineProps({
  tool: {
    type: aDrawingTool,
    required: true,
  },

  isSelected: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <button
    type="button"
    :class="{
      tool: true,
      'tool_is-selected': isSelected,
    }"
  >
    <span>
      {{ tool.label }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.tool
{
  width: 3em;
  height: 3em;
  background: transparent;
  border: 1px solid var(--markup-lines-color);
  outline: none !important;
  cursor: pointer;

  &:active
  {
    transform: scale(95%);
  }

  &_is-selected
  {
    border-color: rgb(255, 255, 0);
  }
}
</style>