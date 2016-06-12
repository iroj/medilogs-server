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
          msg: 'User found, incorrect password'
        });
    }
  });
};
exports.getStudents = function(req, res) {
  console.log('collecting students');
  AppUser.find({
    'faculty': false
  }).exec(function(err, user) {
    if (err)
      res.status(200).send({
        msg: 'Error getting students list',
        err: err
      });

    if (!user) {
      res.status(200).send({
        msg: 'No Student Found'
      });
    } else {
      console.log('students: ', user);

      res.status(200).send({
        msg: 'Student List',
        students: user
      });

    }
  });
};
exports.register = function(req, res) {
  AppUser.findOne({
    email: req.body.email
  }).exec(function(err, user) {
    if (err)
      res.status(200).send({
        msg: 'Error registering user',
        err: err
      });

    if (user) {
      res.status(200).send({
        msg: 'Email is address already taken'
      });
    } else {
      var appUser = new AppUser({
        userName: req.body.userName,
        fullName: req.body.fullName,
        password: req.body.password,
        email: req.body.email,
        faculty: req.body.faculty
      });
      appUser.save(function(err) {
        if (err)
          res.status(200).send({
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
