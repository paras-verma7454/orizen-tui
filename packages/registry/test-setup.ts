/**
 * Test environment setup for ink-testing-library + ink@5 compatibility.
 *
 * Problem: ink@5 calls stdin.ref() and stdin.unref() when enabling raw mode,
 * but ink-testing-library's mock stdin (an EventEmitter) doesn't implement these.
 * This causes "stdin.ref is not a function" errors in all components using useInput.
 *
 * Fix: Patch EventEmitter prototype once at preload time so any mock stdin
 * automatically has no-op ref/unref methods.
 */
import { EventEmitter } from 'node:events'

const proto = EventEmitter.prototype as EventEmitter & { ref?: () => void, unref?: () => void }

if (!proto.ref) {
  proto.ref = function () { return this }
}
if (!proto.unref) {
  proto.unref = function () { return this }
}
