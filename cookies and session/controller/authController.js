exports.getLogin = (req, res, next) => {
  res.render('auth/login', { isLoggedIn: false });
}

exports.postLogin = (req, res, next) => {
  res.cookie('isLoggedIn', true)
  res.redirect('/');
}