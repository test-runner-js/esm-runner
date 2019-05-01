#!/bin/sh
":" //# comment; exec /usr/bin/env node --experimental-modules "$0" "$@"

import EsmRunnerCli from '../index.mjs'
const cli = new EsmRunnerCli()
cli.start()
