<script setup lang="ts">
import { useFormModelStore, type ElementModel } from '@/stores/form-model'
import { computed, onMounted, watch } from 'vue'
const props = defineProps<{
  elementKey: string
  label: string
  activeCondition: boolean
  default?: string
}>()
const formModel = useFormModelStore()
const model = computed({
  get(): ElementModel {
    const value = formModel.state[props.elementKey]
    return value
  },
  set(value: ElementModel): void {
    formModel.update({ [props.elementKey]: value })
  }
})
const value = computed({
  get(): string | undefined {
    return model.value?.value
  },
  set(value: string | undefined): void {
    model.value = {
      ...model.value,
      value
    }
  }
})

function setActiveCondition() {
  model.value = {
    ...model.value,
    activeCondition: props.activeCondition
  }
}

onMounted(() => {
  setActiveCondition()
  if (value.value === undefined && props.default !== undefined) {
    value.value = props.default
  }
})

watch(
  () => props.activeCondition,
  () => setActiveCondition()
)
</script>
<template>
  <div v-if="model?.activeCondition">
    <p>{{ label }}</p>
    <input type="text" v-model="value" />
  </div>
</template>
