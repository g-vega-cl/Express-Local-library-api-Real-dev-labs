const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const homeRoute = express.Router();

// This section will help you get a list of all the records.
homeRoute.route('/').get(async function (_req, res) {
  res.status(200).send('Welcome home');
});

module.exports = homeRoute;
