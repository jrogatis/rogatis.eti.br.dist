'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostsSchema = new _mongoose2.default.Schema({
  title: { type: 'String', required: true },
  text: { type: 'String', required: true },
  postImage: { type: 'String', required: true },
  snipet: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  active: { type: 'Boolean', required: true },
  date: { type: 'Date', required: true },
  author: { type: 'String', required: true },
  coments: [{
    from: { type: 'String', required: false },
    message: { type: 'String', required: false },
    date: { type: 'Date', required: false }
  }]
});

exports.default = _mongoose2.default.model('Posts', PostsSchema);
//# sourceMappingURL=posts.model.js.map
