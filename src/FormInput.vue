<script setup lang="ts">
import { useFormModelStore } from './form-model'
import { computed, onMounted } from 'vue'

const props = defineProps<{
  elementKey: string
  label: string
  default?: string
  condition?: string
}>()

const formModel = useFormModelStore()
const model = computed(() => formModel.getElementModel(props.elementKey))
const value = computed({
  get() {
    return model.value?.value
  },
  set(value) {
    formModel.updateElementValue(props.elementKey, value)
  }
})
</script>
<template>
  <div v-if="model?.activeCondition">
    <p>{{ label }}</p>
    <input type="text" v-model="value" />
  </div>
</template>
