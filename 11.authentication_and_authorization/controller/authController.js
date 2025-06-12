const { check, validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', { isLoggedIn: false });
}
exports.signup = (req, res, next) => {
  res.render('auth/signup', {
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      cpassword: '',
      userType: ''
    }
  });
}

exports.postLogin = (req, res, next) => {

  req.session.isLoggedIn = true;
  res.redirect('/');
}

exports.postSignup = [
  check('firstname')
    .trim()
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('First name must contain only letters'),

  check('lastname')
    .matches(/^[a-zA-Z]*$/)
    .withMessage('First name must contain only letters'),

  check('email')
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  check('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),

  check('cpassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check('userType')
    .notEmpty()
    .withMessage('Please select a user type')
    .isIn(['host', 'regular'])
    .withMessage('Invalid user type selected'),


  (req, res, next) => {
    const { firstname, lastname, email, password, cpassword, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/signup', {
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {
          firstname,
          lastname,
          email,
          password,
          cpassword,
          userType
        }
      });
    }
    res.redirect('/login');
  }
];

exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}
