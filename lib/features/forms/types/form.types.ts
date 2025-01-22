import { z } from 'zod'

export type FieldType = 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'tel'

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  message: string
  value?: any
  validate?: (value: any) => boolean | Promise<boolean>
}

export interface FormFieldConfig {
  type: FieldType
  name: string
  label: string
  placeholder?: string
  description?: string
  validation?: ValidationRule[]
  options?: Array<{
    label: string
    value: string | number
  }>
}

export interface FormStepConfig {
  id: number
  title: string
  description?: string
  fields: FormFieldConfig[]
}

export interface FormConfig {
  id: string
  title: string
  description?: string
  steps: FormStepConfig[]
  submission?: {
    buttonText?: string
  }
}

// Zod schema for runtime validation
export const formConfigSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  steps: z.array(z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    fields: z.array(z.object({
      type: z.enum(['text', 'select', 'radio', 'checkbox', 'switch', 'tel']),
      name: z.string(),
      label: z.string(),
      placeholder: z.string().optional(),
      description: z.string().optional(),
      validation: z.array(z.object({
        type: z.enum(['required', 'min', 'max', 'pattern', 'custom']),
        message: z.string(),
        value: z.any().optional(),
        validate: z.function().optional(),
      })).optional(),
      options: z.array(z.object({
        label: z.string(),
        value: z.union([z.string(), z.number()]),
      })).optional(),
    })),
  })),
  submission: z.object({
    buttonText: z.string().optional(),
  }).optional(),
})
