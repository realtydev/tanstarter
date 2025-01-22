# Schemas Directory

## Purpose
Contains Zod schemas for form validation and type inference.

## Usage
- Define form data structures
- Validate form data
- Generate TypeScript types
- Server-side validation

## Example
```typescript
import { z } from 'zod'

export const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  )
})

export type UserFormData = z.infer<typeof userFormSchema>
```

## Integration
- Used with React Hook Form's `zodResolver`
- Used for API request/response validation
- Used for generating TypeScript types
- Used for runtime validation

## Best Practices
1. Define reusable sub-schemas
2. Use proper error messages
3. Export TypeScript types
4. Keep schemas in sync with API
5. Document complex validations

## Integration Points
- React Hook Form resolver
- API validation
- Type generation
- Runtime validation