<script setup lang="ts">
import FormInput from './FormInput.vue'
import { useFormModelStore } from './form-model'
import type { ElementTemplate } from './types'
import elementsJson from './template_200.json'

const formModel = useFormModelStore()
formModel.setState(elementsJson as ElementTemplate[])
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
