'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectsSchema = new _mongoose2.default.Schema({
  title: String,
  desc: String,
  imgUrl: String,
  siteUrl: String,
  displayFront: Boolean
});

exports.default = _mongoose2.default.model('Projects', ProjectsSchema);
//# sourceMappingURL=projects.model.js.map
