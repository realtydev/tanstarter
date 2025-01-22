import * as React from "react";
import {
  useController,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from "react-hook-form";
import { FieldWrapper } from "./FieldWrapper";
import type { BaseFieldProps } from "../../types/widget.types";

export interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName>,
    Omit<UseControllerProps<TFieldValues, TName>, "name" | "control"> {
  children: (field: {
    value: any;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
    error?: any;
  }) => React.ReactNode;
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  children,
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
  });

  return (
    <FieldWrapper {...props} error={error?.message} name={name} control={control}>
      {children({
        ...field,
        error,
      })}
    </FieldWrapper>
  );
}
