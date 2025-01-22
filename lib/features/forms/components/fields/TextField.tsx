import * as React from "react";
import { Input } from "~/lib/components/ui/input";
import { FormField } from "../core/FormField";
import { cn } from "~/lib/utils";
import type { BaseFieldProps } from "../../types/widget.types";
import type { FieldValues, Path } from "react-hook-form";

export function TextField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: BaseFieldProps<TFieldValues, TName>) {
  return (
    <FormField {...props}>
      {(field) => (
        <Input
          {...field}
          placeholder={props.placeholder}
          disabled={props.isDisabled}
          className={cn(field.error && "border-destructive")}
        />
      )}
    </FormField>
  );
}
