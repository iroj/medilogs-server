'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller');

module.exports = function(app) {
  // Articles collection routes
  app.route('/api/articles')
    .post(articles.create);
  app.route('/api/facultyEvaluations')
    .post(articles.faculty);
  app.route('/api/studentEvaluations')
    .post(articles.student);
  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  // Finish by binding the article middleware
  // app.param('articleId', articles.articleByID);
};
