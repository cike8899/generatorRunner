var api = require('./api/index');
var run = require('./runner/index');
// (function test() {
//   api('topics', 'get').then(res => {
//     console.info(res.data);
//   });
// })();

function* main() {
  try {
    let res = yield api('topics', 'get');
    console.info(res);
  } catch (error) {
    console.error(error);
  }
}

run(main);
