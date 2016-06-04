'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  AppUser = mongoose.model('AppUser');


exports.getInfo = function(req, res) {
  console.log(req.body);
  AppUser.findOne({
    userName: req.body.userName
  }).exec(function(err, user) {
    if (err)
      res.status(200).send({
        msg: 'Error getting user',
        err: err
      });

    if (!user) {
      res.status(200).send({
        msg: 'Username does not exist'
      });
    } else {
      if (user.password === req.body.password)
        res.status(200).send({
          msg: 'User found, correct password',
          user: user
        });
      else
        res.status(200).send({
          msg: 'User found, incorrect password',
          user: user
        });
    }
  });
};

exports.register = function(req, res) {
  AppUser.findOne({
    email: req.body.email
  }).exec(function(err, user) {
    if (err)
      res.status(400).send({
        msg: 'Error getting user',
        err: err
      });

    if (user) {
      res.status(200).send({
        msg: 'Email address already taken',
        user: user
      });
    } else {
      var appUser = new AppUser({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        faculty: req.body.faculty
      });
      appUser.save(function(err) {
        if (err)
          res.status(400).send({
            msg: 'Error saving user',
            err: err
          });
        console.log(appUser);
        res.status(200).send({
          msg: 'User saved',
          user: appUser
        });
      });
    }
  });
};
