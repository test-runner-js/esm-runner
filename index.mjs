import CliApp from 'test-runner'

class EsmCliApp extends CliApp {
  async loadModule (moduleId) {
    return (await import(moduleId)).default
  }
}

export default EsmCliApp
