import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { DataModel, ElementModel, ExpressionModel, ElementTemplate } from './types'
import { evaluate } from './conditions'

const state: Ref<ElementModel[]> = ref([])

const draftModel = computed(() => {
  const result: DataModel = state.value.reduce((acc, current) => {
    acc[current.template.key] = current.value
    return acc
  }, {} as DataModel)
  return result
})

const submitModel = computed(() => {
  const result: DataModel = state.value.reduce((acc, current) => {
    if (current.activeCondition) {
      acc[current.template.key] = current.value
    }
    return acc
  }, {} as DataModel)
  return result
})

function findElementModel(key: string): ElementModel | undefined {
  return state.value.find((e) => e.template.key === key)
}

function handleInput(hasChanges = false) {
  state.value.forEach((element) => {
    if (element.template.condition) {
      const expressionModel: ExpressionModel = {}
      state.value.forEach((innerElement) => {
        if (innerElement.value !== undefined && innerElement.activeCondition) {
          expressionModel[innerElement.template.key] = innerElement.value
        }
      })
      const activeCondition = evaluate(element.template.condition, expressionModel)
      if (element.activeCondition !== activeCondition) {
        element.activeCondition = activeCondition
        hasChanges = true
      }
    }
  })
  if (hasChanges) handleInput()
}

export const useFormModelStore = defineStore('form-model', () => {
  return {
    state,
    submitModel,
    draftModel,
    updateElementValue(key: string, value?: string) {
      const elementModel = findElementModel(key)
      if (!elementModel) {
        throw Error(`element with key "${key}" reported value change, but model not found`)
      }
      elementModel.value = value
      handleInput()
    },
    getElementModel(key: string) {
      return findElementModel(key)
    },
    setState(elements: ElementTemplate[]) {
      state.value = elements.map((element) => ({
        template: element,
        activeCondition: true,
        value: element.default
      }))
    }
  }
})
