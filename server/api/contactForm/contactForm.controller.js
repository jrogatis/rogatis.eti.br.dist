/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/ContactForm              ->  create

 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _contactForm = require('./contactForm.model');

var _contactForm2 = _interopRequireDefault(_contactForm);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressMailer = require('express-mailer');

var _expressMailer2 = _interopRequireDefault(_expressMailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_expressMailer2.default.extend(app, {
  from: 'jrogatis@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_SECRET
  }
});

app.set('views', __dirname + '/');
app.set('view engine', 'pug');

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function handleSendEmail(res, msg) {
  console.log('no email', process.env);
  app.mailer.send('email', {
    to: msg.email,
    subject: 'Your contact for Jean', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
}

// Creates a new ContactForm in the DB
function create(req, res) {
  return _contactForm2.default.create(req.body).then(handleSendEmail(res, req.body));
}
//# sourceMappingURL=contactForm.controller.js.map
