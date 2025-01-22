import { FieldValues, Path } from 'react-hook-form'
import type { WidgetProps } from '../types/widget.types'

type WidgetComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> = React.ComponentType<WidgetProps<TFieldValues, TName>>

interface WidgetRegistryItem<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  component: WidgetComponent<TFieldValues, TName>
  defaultValidation?: RegisterOptions<TFieldValues, TName>
}

const registry = new Map<string, WidgetRegistryItem>()

export function registerWidget<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>(
  type: string,
  component: WidgetComponent<TFieldValues, TName>,
  defaultValidation?: RegisterOptions<TFieldValues, TName>
) {
  registry.set(type, { component, defaultValidation })
}

export function getWidget(type: string) {
  return registry.get(type)
}

export function hasWidget(type: string) {
  return registry.has(type)
}

// For testing purposes
export function clearRegistry() {
  registry.clear()
}