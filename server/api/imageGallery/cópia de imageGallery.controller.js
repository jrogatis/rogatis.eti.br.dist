/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/imageGallery              ->  index
 * POST    /api/imageGallery              ->  create
 * GET     /api/imageGallery/:id          ->  show
 * PUT     /api/imageGallery/:id          ->  upsert
 * PATCH   /api/imageGallery/:id          ->  patch
 * DELETE  /api/imageGallery/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _posts = require('./posts.model');

var _posts2 = _interopRequireDefault(_posts);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ accessKeyId: 'mykey', secretAccessKey: 'mysecret', region: 'global' });
var s3 = new _awsSdk2.default.S3();

var params = {
  Bucket: 'mystore.in',
  Delimiter: '/',
  Prefix: 's/5469b2f5b4292d22522e84e0/ms.files/'
};

s3.listObjects(params, function (err, data) {
  if (err) throw err;
  console.log(data);
});

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

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

// Gets a list of Postss
function index(req, res) {
  return _posts2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Posts from the DB
function show(req, res) {
  return _posts2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Posts in the DB
function create(req, res) {
  return _posts2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Posts in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _posts2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Posts in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _posts2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Posts from the DB
function destroy(req, res) {
  return _posts2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=cópia de imageGallery.controller.js.map
