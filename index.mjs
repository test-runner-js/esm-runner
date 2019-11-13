import TestRunnerCli from 'test-runner'

class EsmRunnerCli extends TestRunnerCli {
  async loadModule (moduleId) {
    return (await import(moduleId)).default
  }
}

export default EsmRunnerCli
