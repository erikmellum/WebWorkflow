exports.index = function(req, res){
  res.render('default', {
    title: 'Home',
    classname: 'home',
    speakers: ['Geoff Lawson', 'Daniel Green', 'Erik Mellum']
  });
}

exports.index = function(req, res){
  res.render('default', {
    title: 'About Us',
    classname: 'about'
  });
}

exports.index = function(req, res){
  var page = req.params.page;
  res.send('Hello from ' + page);
}

exports.index = function(req, res){
  res.send('404 Error page not found');
}
