import TestRunnerCli from 'test-runner'

class EsmCliApp extends TestRunnerCli {
  async loadModule (moduleId) {
    return (await import(moduleId)).default
  }
}

export default EsmCliApp
