#!/usr/bin/env node

import { dev } from './dev.js'
import { build } from './build.js'

const command = process.argv[2]

if (command === "dev") dev()
else if (command === "build") build()
else {
  console.log("Usage: varco <dev|build>")
}
