exports.getLogin = (req, res, next) => {
  res.render('auth/login', { isLoggedIn: false });
}
exports.signup = (req, res, next) => {
  res.render('auth/signup', { isLoggedIn: false });
}

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
}

exports.postSignup = (req, res, next) => {
  console.log(req)
  console.log(req.body);
  res.redirect('/login');
}

exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}
