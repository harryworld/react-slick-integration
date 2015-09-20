// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
require('core-js/es5');
require('babel-core/polyfill');
// Replace ./src/js with the directory of your application code and
// make sure the file name regexp matches your test files.
var context = require.context('../app', true, /-test\.js$/);
context.keys().forEach(context);