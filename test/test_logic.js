const test = require('tape');
const getValue = require('./../public/js/logic');

const object = {
  id: 1,
  name: 'pepic',
};
test('test getValue', (t) => {
  t.equal(getValue(object, 'name'), 'pepic', 'the value must equal');
  t.end();
});
