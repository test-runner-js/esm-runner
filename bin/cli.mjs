#!/bin/sh
":" //# comment; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import EsmRunnerCli from '../index.mjs'
const cli = new EsmRunnerCli()
cli.start().catch(err => {
  console.error(err)
  process.exitCode = 1
})
