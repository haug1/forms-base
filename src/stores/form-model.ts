import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export interface ElementModel {
  value?: string
  activeCondition: boolean
}

interface FormModel {
  [key: string]: ElementModel
}

interface DataModel {
  [key: string]: string
}

export const useFormModelStore = defineStore('form-model', () => {
  const state: Ref<FormModel> = ref({})
  const submitModel = computed(() =>
    Object.keys(state.value).reduce((acc, key) => {
      const current = state.value[key]
      if (current.activeCondition && current.value !== undefined) acc[key] = current.value
      return acc
    }, {} as DataModel)
  )
  const draftModel = computed(() =>
    Object.keys(state.value).reduce((acc, key) => {
      const current = state.value[key]
      if (current.value !== undefined) acc[key] = current.value
      return acc
    }, {} as DataModel)
  )
  function update(key: string, model: ElementModel) {
    state.value[key] = model
  }
  return { state, submitModel, draftModel, update }
})
