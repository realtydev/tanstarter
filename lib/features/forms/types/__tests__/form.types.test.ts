import { formConfigSchema } from '../form.types'
import { describe, it, expect } from 'vitest'

describe('Form Configuration Schema', () => {
  it('validates a basic form configuration', () => {
    const validConfig = {
      id: 'test-form',
      title: 'Test Form',
      steps: [
        {
          id: 1,
          title: 'Basic Info',
          fields: [
            {
              type: 'text' as const,
              name: 'firstName',
              label: 'First Name',
              validation: [
                {
                  type: 'required' as const,
                  message: 'First name is required',
                },
              ],
            },
          ],
        },
      ],
    }

    const result = formConfigSchema.safeParse(validConfig)
    expect(result.success).toBe(true)
  })

  it('fails validation for invalid field type', () => {
    const invalidConfig = {
      id: 'test-form',
      title: 'Test Form',
      steps: [
        {
          id: 1,
          title: 'Basic Info',
          fields: [
            {
              type: 'invalid-type', // Invalid type
              name: 'firstName',
              label: 'First Name',
            },
          ],
        },
      ],
    }

    const result = formConfigSchema.safeParse(invalidConfig)
    expect(result.success).toBe(false)
  })

  it('validates optional fields correctly', () => {
    const configWithOptionals = {
      id: 'test-form',
      title: 'Test Form',
      description: 'Optional description',
      steps: [
        {
          id: 1,
          title: 'Basic Info',
          description: 'Step description',
          fields: [
            {
              type: 'text' as const,
              name: 'firstName',
              label: 'First Name',
              placeholder: 'Enter your first name',
              description: 'Your given name',
            },
          ],
        },
      ],
      submission: {
        buttonText: 'Submit Form',
      },
    }

    const result = formConfigSchema.safeParse(configWithOptionals)
    expect(result.success).toBe(true)
  })

  it('validates select field with options', () => {
    const configWithSelect = {
      id: 'test-form',
      title: 'Test Form',
      steps: [
        {
          id: 1,
          title: 'Basic Info',
          fields: [
            {
              type: 'select' as const,
              name: 'country',
              label: 'Country',
              options: [
                { label: 'USA', value: 'us' },
                { label: 'Canada', value: 'ca' },
              ],
            },
          ],
        },
      ],
    }

    const result = formConfigSchema.safeParse(configWithSelect)
    expect(result.success).toBe(true)
  })
})
