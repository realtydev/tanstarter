import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useForm,
  useFieldArray,
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
  type FieldErrors,
  type Path,
  type ArrayPath,
  type DefaultValues,
} from "react-hook-form";

interface FormManagerOptions<T extends FieldValues> extends UseFormProps<T> {
  formId: string;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  queryKey?: string[];
  queryFn?: () => Promise<T>;
}

export function useFormManager<T extends FieldValues>({
  formId,
  defaultValues,
  queryKey,
  queryFn,
  onSuccess,
  onError,
  ...formConfig
}: FormManagerOptions<T>) {
  const queryClient = useQueryClient();

  // Load initial form data if queryKey and queryFn are provided
  const { data: initialData, isLoading: isLoadingInitial } = useQuery({
    queryKey: queryKey || ["form-data", formId],
    queryFn: queryFn || (async () => defaultValues || ({} as T)),
    enabled: !!queryFn,
    staleTime: 30000,
  });

  // Save form data mutation
  const saveMutation = useMutation({
    mutationFn: async (data: T) => {
      const response = await fetch(`/api/forms/${formId}/data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save form data");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey || ["form-data", formId], data);
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  // Initialize form with React Hook Form
  const form = useForm<T>({
    ...formConfig,
    defaultValues: (initialData || defaultValues) as DefaultValues<T>,
  });

  // Create array operations helper
  const createArrayHelper = <TFieldName extends ArrayPath<T>>(name: TFieldName) => {
    const { fields, append, remove, swap, move, insert } = useFieldArray({
      control: form.control,
      name,
    });

    return {
      fields,
      append,
      remove,
      swap,
      move,
      insert,
    };
  };

  // Handle form submission
  const onSubmit = useCallback(
    async (data: T) => {
      try {
        await saveMutation.mutateAsync(data);
      } catch (error) {
        form.setError("root", {
          type: "submit",
          message: error instanceof Error ? error.message : "Submission failed",
        });
      }
    },
    [form, saveMutation],
  );

  // Validation helpers
  const validationHelpers = {
    setFieldError: (name: Path<T>, error: string) => {
      form.setError(name, { type: "manual", message: error });
    },
    setFieldErrors: (errors: FieldErrors<T>) => {
      Object.entries(errors).forEach(([name, error]) => {
        if (error) {
          form.setError(name as Path<T>, error as any);
        }
      });
    },
    clearFieldError: (name: Path<T>) => {
      form.clearErrors(name);
    },
    validateField: (name: Path<T>) => {
      return form.trigger(name);
    },
  };

  // Form state helpers
  const formState = {
    isLoading: isLoadingInitial || saveMutation.isPending,
    isSaving: saveMutation.isPending,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isSubmitted: form.formState.isSubmitted,
    submitCount: form.formState.submitCount,
    isValidating: form.formState.isValidating,
  };

  return {
    form,
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    formState,
    control: form.control,
    reset: form.reset,
    createArrayHelper,
    validationHelpers,
    watch: form.watch,
    setValue: form.setValue,
    getValues: form.getValues,
  };
}

// Example usage:
/*
interface MyFormData {
  name: string;
  items: {
    title: string;
    description: string;
  }[];
}

function MyForm() {
  const {
    register,
    handleSubmit,
    formState,
    createArrayHelper,
    validationHelpers
  } = useFormManager<MyFormData>({
    formId: 'my-form',
    defaultValues: {
      name: '',
      items: []
    }
  })

  // Create array helper for 'items' field
  const { fields, append, remove } = createArrayHelper('items')

  return (
    <form onSubmit={handleSubmit}>
      <input {...register('name', { required: 'Name is required' })} />
      {formState.errors.name && (
        <span>{formState.errors.name.message}</span>
      )}

      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`items.${index}.title` as const, {
              required: 'Title is required'
            })}
          />
          <input
            {...register(`items.${index}.description` as const)}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ title: '', description: '' })}
      >
        Add Item
      </button>

      <button
        type="submit"
        disabled={!formState.isValid || formState.isSubmitting}
      >
        {formState.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
*/
