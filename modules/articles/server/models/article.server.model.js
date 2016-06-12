'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date
  },
  clinicType: {
    type: String
  },
  encounterType: {
    type: String
  },
  performance: {
    type: Object
  },
  special: {
    type: Object
  },
  student: {
    type: Object,
    ref: 'User'
  },
  faculty: {
    type: Object,
    ref: 'User'
  }
});

mongoose.model('Article', ArticleSchema);
