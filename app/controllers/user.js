var passport = require('passport');

var filters = require('../lib/filters');

/**
 * Users Controller
 */
 
exports = module.exports = {

  // Sign up form
  'new': [
    filters.is_user,
    function(req, res) {
      res.render('users/new');
    }
  ],

  // Sign up POST
  create: [
    filters.create(models.user),
    function(req, res, next) {
      req.flash('info', "<strong>Account created.</strong> Welcome to " + options.appTitle + "!");
      return next();
    },
    passport.authenticate('local', { failureRedirect: '/sessions/login' }),
    function (req, res) { res.redirect('/'); }
  ],

  // Account edit form
  edit: [
    filters.require_self,
    function(req, res) {
      res.render('users/edit', {user: req.user});
    }
  ],

  // Account edit PUT
  update: [
    filters.require_self,
    filters.update('user'),
    function(req, res) {
      req.flash('info', '<strong>Account updated.</strong> Nice!');
      res.redirect('/');
    }
  ],

  // Upload a new photo via ajax
  photo: [
    filters.require_user,
    file_stream('application/octet-stream'),
    
  ]

  // User profile
  show: [
    filters.is_self,
    function(req, res) {
      res.render('users/show', {user: req.user, is_self: req.is_self, section: 'user'});
    }
  ],

  load: function(id, callback) {
    models.user.findById(id, callback).populate('photo');
  }
};