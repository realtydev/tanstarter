import * as React from 'react'
import { useController, type FieldValues, type Path, type UseControllerProps } from 'react-hook-form'
import { FieldWrapper } from './FieldWrapper'
import { getWidget } from '../../utils/registry'
import type { BaseFieldProps } from '../../types/widget.types'

export interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> extends BaseFieldProps<TFieldValues, TName>,
  Omit<UseControllerProps<TFieldValues, TName>, 'name' | 'control'> {
  type: string
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  type,
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  ...props
}: FormFieldProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  })

  const widget = getWidget(type)
  if (!widget) {
    console.warn(`No widget registered for type: ${type}`)
    return null
  }

  const { component: Component } = widget

  return (
    <Component
      {...props}
      {...field}
      control={control}
      name={name}
      error={error}
    />
  )
}