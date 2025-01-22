import * as React from 'react'
import { useFieldArray } from 'react-hook-form'
import { Button } from '@/lib/components/ui/button'
import { FieldWrapper } from '../FieldWrapper'
import type { ArrayFieldProps } from '../../types/widget.types'
import type { FieldValues, Path } from 'react-hook-form'

export function ArrayField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(props: ArrayFieldProps<TFieldValues, TName>) {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: props.name
  })

  return (
    <FieldWrapper {...props}>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-4">
            <div className="flex-1">
              {props.renderItem(index)}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
              disabled={props.isDisabled}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({})}
          disabled={props.isDisabled}
        >
          {props.itemLabel || 'Add Item'}
        </Button>
      </div>
    </FieldWrapper>
  )
}