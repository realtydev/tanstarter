# Components Directory

## Purpose
Contains all form-related React components, organized into a modular structure.

## Structure
```
components/
├── core/                    # Core form components
│   ├── FieldWrapper.tsx    # Common wrapper for all fields
│   └── FormField.tsx       # Base form field component
├── fields/                  # Field implementations
    ├── TextField.tsx
    ├── SelectField.tsx
    ├── SwitchField.tsx
    ├── ArrayField.tsx
    └── index.ts
```

## Key Components

### Core
- `FieldWrapper`: Provides consistent layout and error handling for all fields
- `FormField`: Main component for rendering form fields based on type

### Fields
Each field component:
- Uses React Hook Form's `useController`
- Handles its own state and validation
- Implements specific UI for its type

## Usage
```typescript
<FormField
  type="text"
  control={control}
  name="email"
  label="Email"
  rules={{ 
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  }}
/>
```

## Adding New Fields
1. Create new field component in `fields/`
2. Implement the field using React Hook Form's hooks
3. Register the field type in `fields/index.ts`
4. Add types in `types/widget.types.ts`

## Testing
- Each field has its own test file
- Tests cover rendering, interaction, and validation
- Use React Hook Form's testing utilities

## Integration Points
- Used by form pages and components
- Integrates with React Hook Form
- Uses shadcn/ui components
- Registered in widget registry