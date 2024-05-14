<script setup lang="ts">
import FormInput from '@/components/FormInput.vue'

export interface ElementTemplate {
  key: string
  label: string
  condition?: string
  default?: string
}

const props = defineProps<{ elements: ElementTemplate[] }>()
</script>
<template>
  <ul>
    <li v-for="element in props.elements" :key="element.key">
      <FormInput
        :label="element.label"
        :element-key="element.key"
        :default="element.default"
        :condition="element.condition"
      />
    </li>
  </ul>
</template>
