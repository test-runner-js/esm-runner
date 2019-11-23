import EsmRunnerCli from '../index.mjs'
import a from 'assert'
import { halt } from './lib/util.mjs'

{ /* esmRunnerCli.loadModule JSON */
  const cli = new EsmRunnerCli()
  cli.loadModule('./package.json')
    .then(result => {
      a.strictEqual(result.name, 'esm-runner')
    })
    .catch(halt)
}

{ /* esmRunnerCli.loadModule ESM */
  const cli = new EsmRunnerCli()
  cli.loadModule('./index.mjs')
    .then(result => {
      a.strictEqual(result.name, 'EsmRunnerCli')
    })
    .catch(halt)
}
