<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true
  },
})

defineEmits( [ 'update:modelValue' ] )
</script>

<template>
  <button
    type="button"
    class="tool"
    @click="$emit( 'update:modelValue', name )"
  >
    <span>Brush</span>

    <img src="" alt="Brush">
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
}
</style>