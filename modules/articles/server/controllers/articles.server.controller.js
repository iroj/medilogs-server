'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function(req, res) {
  var a = req.body;
  var article = new Article(req.body);

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(article);
};

/**
 * Update an article
 */
exports.update = function(req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * Article middleware
 */
exports.student = function(req, res) {
  // var a = req.body;
  //   // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   //   return res.status(400).send({
  //   //     message: 'Article is invalid'
  //   //   });
  //   // }

  //   Article.find(id).exec(function(err, article) {
  //     if (err) {
  //       return next(err);
  //     } else if (!article) {
  //       return res.status(404).send({
  //         message: 'No article with that identifier has been found'
  //       });
  //     }
  //     req.article = article;
  //     next();
  //   });
};


exports.faculty = function(req, res) {

  console.log(req.body);
  Article.find({
    'faculty._id': req.body._id
  }).exec(function(err, article) {
    if (err) {
      res.status(200).send({
        msg: 'Error getting evaluations',
        err: err
      });
    } else if (!article) {
      return res.status(200).send({
        msg: 'No evaluations done',
        err: err
      });
    }
    console.log(article);
    res.status(200).send({
      msg: 'Evaluations found',
      evaluations: article
    });
  });
};

exports.student = function(req, res) {

  console.log(req.body);
  Article.find({
    'student._id': req.body._id
  }).exec(function(err, article) {
    if (err) {
      res.status(200).send({
        msg: 'Error getting evaluations',
        err: err
      });
    } else if (!article) {
      return res.status(200).send({
        msg: 'No evaluations done',
        err: err
      });
    }
    console.log(article);
    res.status(200).send({
      msg: 'Evaluations found',
      evaluations: article
    });
  });
};
