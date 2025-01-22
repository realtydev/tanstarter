# Types Directory

## Purpose
Contains TypeScript type definitions for the form system.

## Key Type Definitions

### Widget Types
```typescript
// Base field props shared by all field types
export interface BaseFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  name: TName
  control: Control<TFieldValues>
  rules?: RegisterOptions
  label?: string
  // ... other common props
}

// Specific field type props
export interface SelectFieldProps<T> extends BaseFieldProps<T> {
  options: SelectOption[]
}
```

### Form Types
- Form configuration types
- Form state types
- Validation types
- Helper types

## Usage
1. Import types for form components
2. Use with React Hook Form
3. Type form data structures
4. Type validation rules

## Organization
- `widget.types.ts`: Field component types
- `form.types.ts`: Form-related types
- `validation.types.ts`: Validation-related types

## Best Practices
1. Use generics for type safety
2. Extend base types for specific needs
3. Keep types in sync with schemas
4. Document complex types
5. Use strict typing

## Integration Points
- Used by form components
- Used with React Hook Form
- Used with validation schemas
- Used in API types