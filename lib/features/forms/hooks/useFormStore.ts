import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { FormConfig } from '../types/form.types'

interface FormState {
  formId: string | null
  currentStep: number
  totalSteps: number
  formData: Record<string, any>
  isDirty: boolean
  errors: Record<string, string[]>
  config: FormConfig | null
  lastSaved: Date | null
}

interface FormActions {
  initializeForm: (formId: string, config: FormConfig, initialData?: Record<string, any>) => void
  updateField: (name: string, value: any) => void
  setStep: (step: number) => void
  markAsDirty: (isDirty?: boolean) => void
  setErrors: (errors: Record<string, string[]>) => void
  resetForm: () => void
  updateFormData: (data: Record<string, any>) => void
  setLastSaved: (date: Date) => void
}

type FormStore = FormState & FormActions

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      // Initial state
      formId: null,
      currentStep: 1,
      totalSteps: 1,
      formData: {},
      isDirty: false,
      errors: {},
      config: null,
      lastSaved: null,

      // Actions
      initializeForm: (formId, config, initialData = {}) => {
        set({
          formId,
          config,
          formData: initialData,
          totalSteps: config.steps.length,
          currentStep: 1,
          isDirty: false,
          errors: {},
        })
      },

      updateField: (name, value) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [name]: value,
          },
          isDirty: true,
        }))
      },

      setStep: (step) => {
        const { totalSteps } = get()
        if (step >= 1 && step <= totalSteps) {
          set({ currentStep: step })
        }
      },

      markAsDirty: (isDirty = true) => {
        set({ isDirty })
      },

      setErrors: (errors) => {
        set({ errors })
      },

      resetForm: () => {
        set({
          formData: {},
          isDirty: false,
          errors: {},
          currentStep: 1,
        })
      },

      updateFormData: (data) => {
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        }))
      },

      setLastSaved: (date) => {
        set({ lastSaved: date })
      },
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        formId: state.formId,
        formData: state.formData,
        currentStep: state.currentStep,
        lastSaved: state.lastSaved,
      }),
    }
  )
)
