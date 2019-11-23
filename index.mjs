import TestRunnerCli from 'test-runner'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

class EsmRunnerCli extends TestRunnerCli {
  async loadModule (moduleId) {
    if (moduleId.endsWith('.json')) {
      return require(moduleId)
    } else {
      return (await import(moduleId)).default
    }
  }
}

export default EsmRunnerCli
