import * as React from "react";
import { Input } from "~/lib/components/ui/input";
import { FieldWrapper } from "../core/FieldWrapper";
import { cn } from "~/lib/utils";
import type { BaseFieldProps } from "../../types/widget.types";
import type { FieldValues, Path } from "react-hook-form";

export function TextField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({ error, value, onChange, onBlur, ...props }: BaseFieldProps<TFieldValues, TName>) {
  return (
    <FieldWrapper {...props} error={error?.message}>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={props.placeholder}
        disabled={props.isDisabled}
        className={cn(error && "border-destructive")}
      />
    </FieldWrapper>
  );
}
