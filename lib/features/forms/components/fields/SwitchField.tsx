import * as React from "react";
import { useController } from "react-hook-form";
import { Switch } from "~/lib/components/ui/switch";
import { FieldWrapper } from "../core/FieldWrapper";
import type { SwitchFieldProps } from "../../types/widget.types";
import type { FieldValues, Path } from "react-hook-form";

export function SwitchField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: SwitchFieldProps<TFieldValues, TName>) {
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
      <div className="flex items-center justify-between">
        {props.icon && <div className="mr-2">{props.icon}</div>}
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={props.isDisabled}
        />
      </div>
    </FieldWrapper>
  );
}
