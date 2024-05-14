<script setup lang="ts">
import { useFormModelStore, type ElementModel } from '@/stores/form-model'
import { evaluate } from '@/utils/conditions'
import { computed, onMounted, watch } from 'vue'

const props = defineProps<{
  elementKey: string
  label: string
  default?: string
  condition?: string
}>()

const formModel = useFormModelStore()

const model = computed({
  get(): ElementModel {
    const value = formModel.state[props.elementKey]
    return value
  },
  set(value: ElementModel): void {
    formModel.update(props.elementKey, value)
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
const activeCondition = computed(() => {
  return evaluate(props.condition, formModel.submitModel)
})

watch(activeCondition, (oldValue, newValue) => {
  if (oldValue != newValue) {
    setActiveCondition()
  }
})

onMounted(() => {
  setActiveCondition()
  if (value.value === undefined && props.default !== undefined) {
    value.value = props.default
  }
})

function setActiveCondition() {
  model.value = {
    ...model.value,
    activeCondition: activeCondition.value
  }
}
</script>
<template>
  <div v-if="activeCondition">
    <p>{{ label }}</p>
    <input type="text" v-model="value" />
  </div>
</template>
