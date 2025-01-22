# Forms Feature

## Overview
A comprehensive form system built with React Hook Form, providing reusable form components, validation, and state management.

## Directory Structure
```
forms/
├── api/            # API integration
├── components/     # React components
├── hooks/          # Custom hooks
├── schemas/        # Zod schemas
├── types/          # TypeScript types
└── utils/          # Utilities and registry
```

## Key Features
- Type-safe form handling
- Reusable field components
- Form state management
- Validation (client & server)
- Array field support
- API integration

## Core Technologies
- React Hook Form
- TanStack Query
- Zod
- TypeScript
- shadcn/ui

## Quick Start
```typescript
function MyForm() {
  const { control, handleSubmit } = useFormManager({
    formId: 'my-form',
    defaultValues: {
      name: '',
      email: ''
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        type="text"
        control={control}
        name="name"
        label="Name"
        rules={{ required: 'Name is required' }}
      />
    </form>
  )
}
```

## Adding New Fields
1. Create component in `components/fields/`
2. Add types in `types/widget.types.ts`
3. Register in `fields/index.ts`
4. Add validation schema if needed
5. Add tests

## Testing
- Unit tests for components
- Integration tests for forms
- Validation testing
- API integration testing

## Best Practices
1. Use type-safe components
2. Implement proper validation
3. Handle loading states
4. Use proper error handling
5. Document new features

## Common Patterns
- Form initialization
- Array field handling
- Validation rules
- API integration
- Error handling