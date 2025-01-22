import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '../useFormStore'

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({
      formId: null,
      currentStep: 1,
      totalSteps: 1,
      formData: {},
      isDirty: false,
      errors: {},
      config: null,
      lastSaved: null,
    })
  })

  it('initializes form correctly', () => {
    const config = {
      id: 'test-form',
      title: 'Test Form',
      steps: [
        {
          id: 1,
          title: 'Step 1',
          fields: [],
        },
        {
          id: 2,
          title: 'Step 2',
          fields: [],
        },
      ],
    }

    const initialData = { field1: 'value1' }

    useFormStore.getState().initializeForm('test-form', config, initialData)

    const state = useFormStore.getState()
    expect(state.formId).toBe('test-form')
    expect(state.config).toBe(config)
    expect(state.formData).toEqual(initialData)
    expect(state.totalSteps).toBe(2)
    expect(state.currentStep).toBe(1)
    expect(state.isDirty).toBe(false)
  })

  it('updates field correctly', () => {
    useFormStore.getState().updateField('testField', 'testValue')

    const state = useFormStore.getState()
    expect(state.formData.testField).toBe('testValue')
    expect(state.isDirty).toBe(true)
  })

  it('handles step navigation', () => {
    useFormStore.setState({ totalSteps: 3 })

    const { setStep } = useFormStore.getState()
    
    setStep(2)
    expect(useFormStore.getState().currentStep).toBe(2)

    // Shouldn't go beyond total steps
    setStep(4)
    expect(useFormStore.getState().currentStep).toBe(2)

    // Shouldn't go below 1
    setStep(0)
    expect(useFormStore.getState().currentStep).toBe(2)
  })

  it('resets form state', () => {
    useFormStore.setState({
      formData: { field1: 'value1' },
      isDirty: true,
      errors: { field1: ['error'] },
      currentStep: 2,
    })

    useFormStore.getState().resetForm()

    const state = useFormStore.getState()
    expect(state.formData).toEqual({})
    expect(state.isDirty).toBe(false)
    expect(state.errors).toEqual({})
    expect(state.currentStep).toBe(1)
  })

  it('updates form data without losing existing data', () => {
    useFormStore.setState({
      formData: { existing: 'value' },
    })

    useFormStore.getState().updateFormData({ new: 'value' })

    const state = useFormStore.getState()
    expect(state.formData).toEqual({
      existing: 'value',
      new: 'value',
    })
  })
})
