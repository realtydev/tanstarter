import { describe, it, expect, beforeEach } from 'vitest'
import { registerWidget, getWidget, hasWidget, __registry } from '../registry'

describe('Widget Registry', () => {
  beforeEach(() => {
    // Clear registry before each test
    __registry.clear()
  })

  it('registers and retrieves widgets', () => {
    const MockComponent = () => null
    const defaultValidation = [{ type: 'required', message: 'Required field' }]

    registerWidget('test', MockComponent, defaultValidation)

    const widget = getWidget('test')
    expect(widget).toBeDefined()
    expect(widget?.component).toBe(MockComponent)
    expect(widget?.defaultValidation).toBe(defaultValidation)
  })

  it('checks if widget exists', () => {
    const MockComponent = () => null
    registerWidget('test', MockComponent)

    expect(hasWidget('test')).toBe(true)
    expect(hasWidget('nonexistent')).toBe(false)
  })

  it('does not require default validation', () => {
    const MockComponent = () => null
    registerWidget('test', MockComponent)

    const widget = getWidget('test')
    expect(widget).toBeDefined()
    expect(widget?.component).toBe(MockComponent)
    expect(widget?.defaultValidation).toBeUndefined()
  })
})
