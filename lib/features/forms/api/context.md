# API Directory

## Purpose
Contains API-related functionality for form data persistence and retrieval.

## Contents
- API handlers for form data
- Data transformation layers
- API type definitions

## Usage
Used by the form manager to:
- Save form data
- Load initial form data
- Handle form submissions
- Validate server-side data

## Example
```typescript
// Example API handler
export async function saveFormData(formId: string, data: any) {
  const response = await fetch(`/api/forms/${formId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.json()
}
```

## Integration Points
- Used by `useFormManager` hook
- Integrates with form submission handling
- Handles data persistence