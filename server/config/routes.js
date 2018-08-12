

module.exports = function(app) {
  // app.get('/partials/:partialPath', function(req, res) {
//   res.render('partials/' + req.params.partialPath);
// });

app.get('/partials/*', function(req, res) {
  console.log(req.params[0])
  res.render('../../public/app/' + req.params[0]);  // the first index will be what matches with asterisk
});

app.get('*', function(req, res) {
  res.render('index');
});

}