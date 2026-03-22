import { describe, expect, it } from 'bun:test'
import { Text } from 'ink'
import { render } from 'ink-testing-library'
import React, { useEffect } from 'react'
import { FocusManager, useFocus, useFocusManager } from './focus.js'

async function tick() {
  await new Promise(resolve => setTimeout(resolve, 0))
}

function FocusItem({ id, label }: { id: string, label: string }) {
  const { isFocused, focus } = useFocus(id)
  useEffect(() => {
    if (label === 'autofocus-second')
      focus()
  }, [focus, label])
  return <Text>{`${label}:${isFocused ? 'Y' : 'N'}`}</Text>
}

function FocusController({ action }: { action: 'none' | 'next' | 'prev' | 'focus-second' }) {
  const { activeId, focusNext, focusPrev, focus } = useFocusManager()

  useEffect(() => {
    if (action === 'next')
      focusNext()
    if (action === 'prev')
      focusPrev()
    if (action === 'focus-second')
      focus('second')
  }, [action, focus, focusNext, focusPrev])

  return <Text>{`active:${activeId ?? 'none'}`}</Text>
}

let capturedManager: ReturnType<typeof useFocusManager> | null = null

function CaptureManager() {
  capturedManager = useFocusManager()
  return <Text>{`active:${capturedManager.activeId ?? 'none'}`}</Text>
}

describe('FocusManager', () => {
  it('focuses the first registered item by default', async () => {
    const { lastFrame } = render(
      <FocusManager>
        <FocusItem id="first" label="first" />
        <FocusItem id="second" label="second" />
      </FocusManager>,
    )
    await tick()

    const frame = lastFrame() ?? ''
    expect(frame).toContain('first:Y')
    expect(frame).toContain('second:N')
  })

  it('respects defaultId when provided', () => {
    const { lastFrame } = render(
      <FocusManager defaultId="second">
        <FocusItem id="first" label="first" />
        <FocusItem id="second" label="second" />
      </FocusManager>,
    )

    const frame = lastFrame() ?? ''
    expect(frame).toContain('first:N')
    expect(frame).toContain('second:Y')
  })

  it('supports programmatic focus changes through context', async () => {
    const { lastFrame, rerender } = render(
      <FocusManager>
        <FocusController action="none" />
        <FocusItem id="first" label="first" />
        <FocusItem id="second" label="second" />
      </FocusManager>,
    )
    await tick()

    rerender(
      <FocusManager>
        <FocusController action="focus-second" />
        <FocusItem id="first" label="first" />
        <FocusItem id="second" label="second" />
      </FocusManager>,
    )
    await tick()

    const frame = lastFrame() ?? ''
    expect(frame).toContain('first:N')
    expect(frame).toContain('second:Y')
    expect(frame).toContain('active:second')
  })

  it('cycles focus next and previous', async () => {
    const { lastFrame } = render(
      <FocusManager defaultId="first">
        <CaptureManager />
        <FocusItem id="first" label="first" />
        <FocusItem id="second" label="second" />
      </FocusManager>,
    )
    await tick()
    capturedManager?.focusNext()
    await tick()
    expect(lastFrame()).toContain('active:second')

    capturedManager?.focusPrev()
    await tick()
    expect(lastFrame()).toContain('active:first')
  })

  it('unregisters items when they are removed from the tree', async () => {
    const { lastFrame, rerender } = render(
      <FocusManager>
        <FocusItem id="first" label="first" />
        <FocusItem id="second" label="autofocus-second" />
      </FocusManager>,
    )
    await tick()
    expect(lastFrame()).toContain('autofocus-second:Y')

    rerender(
      <FocusManager>
        <FocusItem id="first" label="first" />
      </FocusManager>,
    )
    await tick()
    const frame = lastFrame() ?? ''
    expect(frame).toContain('first:Y')
    expect(frame).not.toContain('autofocus-second')
  })
})
