'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageInfosSchema = new _mongoose2.default.Schema({
  pageName: String,
  pageDesc: String,
  pageImgUrl: String,
  pageUrl: String,
  pageShortUrl: String
});

exports.default = _mongoose2.default.model('PageInfos', PageInfosSchema);
//# sourceMappingURL=pageInfos.model.js.map
