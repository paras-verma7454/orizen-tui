#!/usr/bin/env node

import process from 'node:process'
import { Command } from 'commander'
import pc from 'picocolors'
import { createAddCommand } from './commands/add.js'

const program = new Command()

program
  .name('orizen-tui')
  .description('Add beautiful terminal UI components to your project')
  .version('0.1.0')

program.addCommand(createAddCommand())

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`${pc.red('Error:')} ${message}`)
  process.exit(1)
})
