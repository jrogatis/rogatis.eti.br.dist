'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostsSchema = new _mongoose2.default.Schema({
  title: String,
  text: String,
  postImage: String,
  snipet: String,
  slug: String,
  active: Boolean,
  coments: [{
    from: String,
    message: String,
    date: Date
  }]
});

exports.default = _mongoose2.default.model('Posts', PostsSchema);
//# sourceMappingURL=posts.model.js.map
