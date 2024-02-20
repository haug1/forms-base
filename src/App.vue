<script setup lang="ts">
import RootForm, { type ElementTemplate } from '@/components/RootForm.vue'

function generateElements() {
  const NUM_ELEMENTS = 200
  const elements: ElementTemplate[] = []

  for (let i = 0; i < NUM_ELEMENTS; i++) {
    elements.push({
      key: `input${i}`,
      label: `Input ${i}`,
      condition: i > 0 ? `input${i - 1} == 'asd'` : undefined,
      default: 'asd'
    })
  }

  return elements
}

const elements = generateElements()
</script>
<template>
  <RootForm :elements="elements" />
</template>
