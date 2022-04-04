const express = require('express')
const app = express()
const port = 3000

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  console.log('이거뜨면 이해 잘못한거')
  res.status(500).send('Something broke!');
});

// var myLogger = function (req, res, next) {
//   console.log('LOGGED');
//   next();
// };

// app.use(myLogger);

// app.get('/', function (req, res) {
//   res.send('Hello World!');
//   console.log('첫번째')
// });

// var requestTime = function (req, res, next) {
//   req.requestTime = Date.now();
//   console.log('첫번째')
//   next();
// };

// app.use(requestTime);


// app.get('/', function (req, res) {
//   var responseText = 'Hello World!';
//   responseText += 'Requested at: ' + req.requestTime + '';
//   res.send(responseText);
//   console.log('두번째')
// });

// app.get('/', function (req, res, next) {
//   console.log('ID:', req.params.id);
//   console.log('첫번째')
//   next();
// }, function (req, res, next) {
//   res.send('User Info');
//   console.log('두번째')
// });

// // handler for the /user/:id path, which prints the user ID
// app.get('/', function (req, res, next) {
//   res.end(req.params.id);
//   console.log('얘가 되면 말이안됨')
// }); // 결론 : 얘는 안되는게 맞았다

// app.get('/', function (req, res, next) {
//   // if the user ID is 0, skip to the next route

//   if (req.params.id == 0) next('route');
//   // otherwise pass the control to the next middleware function in this stack

//   else next(); //
// }, function (req, res, next) {
//   // render a regular page

//   res.render('regular');
// });






app.listen(port, () => {
  console.log(`Example app listing at http://localhost:${port}`)
})

