import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFormManager } from '../useFormManager'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFormStore } from '../useFormStore'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

// Setup wrapper with QueryClientProvider
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useFormManager', () => {
  const mockConfig = {
    id: 'test-form',
    title: 'Test Form',
    steps: [
      {
        id: 1,
        title: 'Step 1',
        fields: [
          {
            type: 'text' as const,
            name: 'field1',
            label: 'Field 1',
          },
        ],
      },
    ],
  }

  beforeEach(() => {
    mockFetch.mockReset()
    queryClient.clear()
    useFormStore.setState({
      formId: null,
      currentStep: 1,
      totalSteps: 1,
      formData: {},
      isDirty: false,
      errors: {},
      config: null,
      lastSaved: null,
    })
  })

  it('loads initial form data', async () => {
    const initialData = { field1: 'initial value' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(initialData),
    })

    const { result, waitFor } = renderHook(
      () =>
        useFormManager({
          formId: 'test-form',
          config: mockConfig,
        }),
      { wrapper }
    )

    await waitFor(() => {
      const formState = useFormStore.getState()
      expect(formState.formData).toEqual(initialData)
    })
  })

  it('handles form submission', async () => {
    const onSave = vi.fn()
    const submittedData = { field1: 'new value' }

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ field1: 'initial value' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(submittedData),
      })

    const { result, waitFor } = renderHook(
      () =>
        useFormManager({
          formId: 'test-form',
          config: mockConfig,
          onSave,
        }),
      { wrapper }
    )

    await waitFor(() => {
      expect(result.current.form).toBeDefined()
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(submittedData)
    })
  })

  it('handles save errors', async () => {
    const onError = vi.fn()
    const error = new Error('Save failed')

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ field1: 'initial value' }),
      })
      .mockRejectedValueOnce(error)

    const { result, waitFor } = renderHook(
      () =>
        useFormManager({
          formId: 'test-form',
          config: mockConfig,
          onError,
        }),
      { wrapper }
    )

    await waitFor(() => {
      expect(result.current.form).toBeDefined()
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error)
    })
  })

  it('handles autosave when form becomes dirty', async () => {
    vi.useFakeTimers()
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ field1: 'initial value' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ field1: 'new value' }),
      })

    const { result, waitFor } = renderHook(
      () =>
        useFormManager({
          formId: 'test-form',
          config: mockConfig,
        }),
      { wrapper }
    )

    await waitFor(() => {
      expect(result.current.form).toBeDefined()
    })

    act(() => {
      useFormStore.setState({
        formData: { field1: 'new value' },
        isDirty: true,
      })
    })

    // Fast-forward timers
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    vi.useRealTimers()
  })
})
