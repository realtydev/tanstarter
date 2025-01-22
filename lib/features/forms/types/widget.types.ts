import type { 
  Control, 
  FieldValues, 
  Path,
  RegisterOptions,
  FieldError
} from 'react-hook-form'

export type FieldType = 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'tel' | 'array'

export interface BaseFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  name: TName
  control: Control<TFieldValues>
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  label?: string
  description?: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
  error?: FieldError
  value?: any
  onChange?: (...event: any[]) => void
  onBlur?: () => void
}

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> extends BaseFieldProps<TFieldValues, TName> {
  options: SelectOption[]
}

export interface SwitchFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> extends BaseFieldProps<TFieldValues, TName> {
  icon?: React.ReactNode
}

export interface ArrayFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> extends BaseFieldProps<TFieldValues, TName> {
  itemLabel?: string
  renderItem: (index: number) => React.ReactNode
}

export type WidgetProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> =
  | BaseFieldProps<TFieldValues, TName>
  | SelectFieldProps<TFieldValues, TName>
  | SwitchFieldProps<TFieldValues, TName>
  | ArrayFieldProps<TFieldValues, TName>
