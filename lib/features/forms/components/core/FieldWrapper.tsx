import * as React from "react";
import { Label } from "~/lib/components/ui/label";
import { cn } from "~/lib/utils";
import type { BaseFieldProps } from "../../types/widget.types";
import type { FieldValues, Path } from "react-hook-form";

interface FieldWrapperProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> extends Omit<BaseFieldProps<TFieldValues, TName>, "error"> {
  children: React.ReactNode;
  error?: string;
}

export function FieldWrapper<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  description,
  error,
  children,
  isRequired,
  className,
}: FieldWrapperProps<TFieldValues, TName>) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label>
          {label}
          {isRequired && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}
      {children}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
