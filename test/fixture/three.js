const Tom = require('test-object-model')

const tom = module.exports = new Tom('Fixture three')
tom.test('five', () => 5)
tom.test('six', () => 6)
