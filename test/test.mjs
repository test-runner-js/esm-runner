import EsmRunnerCli from '../index.mjs'
import a from 'assert'
import { halt } from './lib/util.mjs'

{ /* single file run */
  class EsmRunnerTest extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ 'test/fixture/one.js' ] })
    }
  }
  const cli = new EsmRunnerTest()
  cli.start()
    .then(runner => {
      a.strictEqual(runner.tom.children[0].result, 1)
      a.strictEqual(runner.tom.children[1].result, 2)
    })
    .catch(halt)
}

{ /* multiple file run */
  class EsmRunnerTest extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ 'test/fixture/three.js', 'test/fixture/two.js' ] })
    }
  }
  const cli = new EsmRunnerTest()
  cli.start()
    .then(runner => {
      const results = Array.from(runner.tom).map(tom => tom.result).filter(r => r)
      a.deepStrictEqual(results, [ 5, 6, 3, 4 ])
    })
    .catch(halt)
}

{ /* exitCode: fail */
  class EsmRunnerTest extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ 'test/fixture/fail.js' ] })
    }
  }
  const runnerCli = new EsmRunnerTest()
  const origExitCode = process.exitCode
  a.strictEqual(process.exitCode, undefined)
  runnerCli.start()
    .then(results => {
      a.strictEqual(process.exitCode, 1)
      process.exitCode = origExitCode
    })
    .catch(halt)
}
