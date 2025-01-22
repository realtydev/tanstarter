import * as React from "react";
import { useController } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/components/ui/select";
import { FieldWrapper } from "../core/FieldWrapper";
import { cn } from "~/lib/utils";
import type { SelectFieldProps } from "../../types/widget.types";
import type { FieldValues, Path } from "react-hook-form";

export function SelectField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: SelectFieldProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  });

  return (
    <FieldWrapper {...props} error={error?.message}>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
        disabled={props.isDisabled}
      >
        <SelectTrigger className={cn(error && "border-destructive")}>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldWrapper>
  );
}
