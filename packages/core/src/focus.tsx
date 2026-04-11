import { useInput, useStdin } from 'ink'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// ── Context ───────────────────────────────────────────────────────────────────

interface FocusContextValue {
  activeId: string | null
  register: (id: string) => void
  unregister: (id: string) => void
  focus: (id: string) => void
  isFocused: (id: string) => boolean
  focusNext: () => void
  focusPrev: () => void
}

const FocusContext = createContext<FocusContextValue>({
  activeId: null,
  register: () => {},
  unregister: () => {},
  focus: () => {},
  isFocused: () => false,
  focusNext: () => {},
  focusPrev: () => {},
})

// ── Tab key handler — split out so useInput is conditionally mounted ──────────
//
// robust-tty-detection: useInput calls stdin.setRawMode() which throws when raw
// mode is unsupported (piped stdin, CI, non-TTY contexts). By putting useInput
// inside a child component that is only rendered when isRawModeSupported, we
// avoid the crash without a try/catch and without conditional hook calls.

interface TabHandlerProps {
  cycleFocus: boolean
  focusNext: () => void
  focusPrev: () => void
}

function TabHandler({ cycleFocus, focusNext, focusPrev }: TabHandlerProps): null {
  useInput((_input, key) => {
    if (!cycleFocus)
      return
    if (key.tab) {
      key.shift ? focusPrev() : focusNext()
    }
  })
  return null
}

// ── FocusManager component ────────────────────────────────────────────────────

export interface FocusManagerProps {
  children: React.ReactNode
  /** ID of the initially focused component — defaults to first registered */
  defaultId?: string
  /** Whether Tab/Shift+Tab cycles focus. Disable if you handle focus manually. */
  cycleFocus?: boolean
}

/**
 * FocusManager — context-based focus orchestration for interactive components.
 *
 * terminal-ui skill (input-isactive-focus): FocusManager eliminates the need
 * to pass `isFocused` props manually. Components call useFocus(id) and receive
 * their focus state from context. Only the focused component's useInput fires.
 *
 * Usage:
 *   <FocusManager defaultId="menu">
 *     <Select ... focus={isFocused} />      ← via useFocus('menu')
 *     <Checkbox ... focus={isFocused} />    ← via useFocus('checkbox')
 *   </FocusManager>
 */
export function FocusManager({ children, defaultId, cycleFocus = true }: FocusManagerProps): JSX.Element {
  // Use a ref for ids so focusNext/focusPrev have a stable closure over it
  const idsRef = useRef<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(defaultId ?? null)
  // robust-tty-detection: only mount TabHandler when stdin supports raw mode
  const { isRawModeSupported } = useStdin()

  const register = useCallback((id: string) => {
    if (!idsRef.current.includes(id)) {
      idsRef.current = [...idsRef.current, id]
    }
    setActiveId(curr => curr ?? id)
  }, [])

  const unregister = useCallback((id: string) => {
    idsRef.current = idsRef.current.filter(i => i !== id)
    setActiveId(curr => (curr === id ? idsRef.current[0] ?? null : curr))
  }, [])

  const focus = useCallback((id: string) => setActiveId(id), [])
  // robust-tty-detection: never report focused when raw mode is unavailable —
  // prevents child components from calling useInput with isActive:true on non-TTY stdin
  const isFocused = useCallback(
    (id: string) => isRawModeSupported && activeId === id,
    [activeId, isRawModeSupported],
  )

  const focusNext = useCallback(() => {
    const ids = idsRef.current
    if (ids.length === 0)
      return
    const idx = activeId ? ids.indexOf(activeId) : -1
    setActiveId(ids[(idx + 1) % ids.length])
  }, [activeId])

  const focusPrev = useCallback(() => {
    const ids = idsRef.current
    if (ids.length === 0)
      return
    const idx = activeId ? ids.indexOf(activeId) : 0
    setActiveId(ids[(idx - 1 + ids.length) % ids.length])
  }, [activeId])

  return (
    <FocusContext.Provider value={{ activeId, register, unregister, focus, isFocused, focusNext, focusPrev }}>
      {isRawModeSupported
        ? <TabHandler cycleFocus={cycleFocus} focusNext={focusNext} focusPrev={focusPrev} />
        : null}
      {children}
    </FocusContext.Provider>
  )
}

// ── useFocus hook — used inside interactive components ────────────────────────

/**
 * useFocus(id) — register a component with FocusManager and get its focus state.
 *
 * Returns { isFocused, focus } so the component can:
 *  1. Pass isFocused to its useInput's isActive option
 *  2. Programmatically steal focus on mouse-click equivalent
 */
export function useFocus(id: string): { isFocused: boolean, focus: () => void } {
  const ctx = useContext(FocusContext)

  useEffect(() => {
    ctx.register(id)
    // tuistate-cleanup-effects: unregister on unmount
    return () => ctx.unregister(id)
  }, [id])

  return {
    isFocused: ctx.isFocused(id),
    focus: () => ctx.focus(id),
  }
}

/** Access the full FocusManager context (for advanced use cases) */
export function useFocusManager(): FocusContextValue {
  return useContext(FocusContext)
}
