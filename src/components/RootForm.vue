<script setup lang="ts">
import FormInput from '@/components/FormInput.vue'
import { useFormModelStore } from '@/stores/form-model'
import { evaluate } from '@/utils/conditions'
import { computed } from 'vue'

export interface ElementTemplate {
  key: string
  label: string
  condition?: string
  default?: string
}

const { elements } = defineProps<{ elements: ElementTemplate[] }>()
const formModel = useFormModelStore()

const elementsWithContext = computed(() => {
  return elements.map((element) => ({
    element,
    activeCondition: evaluate(element.condition, formModel.submitModel)
  }))
})
</script>
<template>
  <ul>
    <li v-for="{ element, activeCondition } in elementsWithContext" :key="element.key">
      <FormInput
        :active-condition="activeCondition"
        :label="element.label"
        :element-key="element.key"
        :default="element.default"
      />
    </li>
  </ul>
</template>
