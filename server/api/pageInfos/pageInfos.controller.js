/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pageInfos              ->  index
 * POST    /api/pageInfos              ->  create
* GET      /api/pageInfos/pageUrl/:id  ->  showByUrl
 * GET     /api/pageInfos/:id          ->  show
 * PUT     /api/pageInfos/:id          ->  upsert
 * PATCH   /api/pageInfos/:id          ->  patch
 * DELETE  /api/pageInfos/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.showByUrl = showByUrl;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _pageInfos = require('./pageInfos.model');

var _pageInfos2 = _interopRequireDefault(_pageInfos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Gets a list of pagesInfos
function index(req, res) {
  console.log("entao");
  return _pageInfos2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single pagesInfo from the DB
function showByUrl(req, res) {
  return _pageInfos2.default.findOne({ pageUrl: req.params.id }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single pagesInfo from the DB
function show(req, res) {
  return _pageInfos2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new pagesInfo in the DB
function create(req, res) {
  return _pageInfos2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given pageInfos in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _pageInfos2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing pageInfos in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _pageInfos2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a pageInfos from the DB
function destroy(req, res) {
  return _pageInfos2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=pageInfos.controller.js.map
