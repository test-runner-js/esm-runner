import EsmRunnerCli from '../'
import a from 'assert'
import { halt } from './lib/util'

{ /* no args */
  const counts = []
  function errorLog (msg) {
    a.ok(/test-runner/.test(msg))
    counts.push('log')
  }
  const cli = new EsmRunnerCli({ errorLog })
  cli.start()
    .then()
    .catch(halt)
}

{ /* --help */
  const counts = []
  function errorLog (msg) {
    a.ok(/test-runner/.test(msg))
    counts.push('log')
  }
  class TestCliApp extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ '--help' ] })
    }
  }
  const cli = new TestCliApp({ errorLog })
  cli.start()
    .then()
    .catch(halt)
}

{ /* single file run */
  class TestCliApp extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ 'test/fixture/one.js' ] })
    }
  }
  const cli = new TestCliApp()
  cli.start()
    .then(results => {
      a.deepStrictEqual(results, [ undefined, 1, 2 ])
    })
    .catch(halt)
}

{ /* multiple file run */
  class TestCliApp extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ 'test/fixture/three.js', 'test/fixture/two.js' ] })
    }
  }
  const cli = new TestCliApp()
  cli.start()
    .then(results => {
      a.deepStrictEqual(results, [ 
        undefined,
        undefined,
        5,
        6,
        undefined,
        3, 4 
      ])
    })
    .catch(halt)
}

{ /* multiple file run: only */
  class TestCliApp extends EsmRunnerCli {
    async getOptions () {
      const commandLineArgs = await this.loadModule('command-line-args')
      return commandLineArgs(this.optionDefinitions, { argv: [ 'test/fixture/four.js', 'test/fixture/only.js' ] })
    }
  }
  const cli = new TestCliApp()
  cli.start()
    .then(results => {
      a.deepStrictEqual(results, [ undefined, undefined, undefined, undefined, undefined, undefined, 6 ])
    })
    .catch(halt)
}
