'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AppUserSchema = new Schema({
  userName: {
    type: String
  },
  fullName: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  faculty: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('AppUser', AppUserSchema);
