import TestRunnerCli from 'test-runner'
import module from 'module'

let require
if (module.createRequire) {
  require = module.createRequire(import.meta.url)
}

class EsmRunnerCli extends TestRunnerCli {
  async loadModule (moduleId) {
    if (moduleId.endsWith('.json') && require) {
      return require(moduleId)
    } else {
      return (await import(moduleId)).default
    }
  }
}

export default EsmRunnerCli
