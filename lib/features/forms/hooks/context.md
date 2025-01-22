# Hooks Directory

## Purpose
Contains custom hooks for form state management and interactions.

## Key Hooks

### useFormManager
Main hook for form management, integrating React Hook Form with our system.

```typescript
const { 
  control,
  handleSubmit,
  formState,
  arrayHelpers,
  validationHelpers 
} = useFormManager({
  formId: 'my-form',
  defaultValues: {},
  queryKey: ['form-data'],
  queryFn: () => fetchFormData()
})
```

Features:
- Form state management
- Data persistence
- Array field operations
- Validation handling
- Integration with TanStack Query

### Functionality
- Manages form state using React Hook Form
- Handles form submission
- Provides array field operations
- Manages validation state
- Integrates with API layer
- Provides form metadata

## Usage Guidelines
1. Use `useFormManager` at the top level of your form component
2. Pass `control` to form fields
3. Use `handleSubmit` for form submission
4. Use `arrayHelpers` for array field operations
5. Use `validationHelpers` for manual validation

## Integration Points
- Uses React Hook Form
- Uses TanStack Query
- Integrates with API layer
- Used by form components

## Example
```typescript
function MyForm() {
  const { 
    control, 
    handleSubmit,
    arrayHelpers 
  } = useFormManager({
    formId: 'my-form',
    defaultValues: {
      items: []
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        type="text"
        name="name"
        control={control}
      />
      {/* Array field example */}
      <button 
        type="button"
        onClick={() => arrayHelpers.push('items', {})}
      >
        Add Item
      </button>
    </form>
  )
}
```