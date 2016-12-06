'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectsSchema = new _mongoose2.default.Schema({
  title: { type: 'String', required: true },
  type: { type: 'String', required: true },
  desc: { type: 'String', required: true },
  imgUrl: { type: 'String', required: true },
  siteUrl: { type: 'String', required: true },
  displayFront: { type: Boolean, required: true }
});

exports.default = _mongoose2.default.model('Projects', ProjectsSchema);
//# sourceMappingURL=projects.model.js.map
