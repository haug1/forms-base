<script setup lang="ts">
import FormInput from './FormInput.vue'
import { useFormModelStore } from './form-model'
import type { ElementTemplate } from './types'

const formModel = useFormModelStore()

// const NUM_ELEMENTS = 200
const NUM_ELEMENTS = 4
const elements: ElementTemplate[] = Array.from({ length: NUM_ELEMENTS }, (_, i) => ({
  key: `input${i}`,
  label: `Input ${i}`,
  condition: i > 0 ? `input${i - 1} == 'asd'` : undefined,
  default: 'asd'
}))

formModel.setState(elements)
</script>
<template>
  <FormInput
    v-for="{ template } in formModel.state"
    :key="template.key"
    :label="template.label"
    :element-key="template.key"
    :condition="template.condition"
    :default="template.default"
  />
</template>
