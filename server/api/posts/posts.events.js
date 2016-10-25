/**
 * Thing model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _posts = require('./posts.model');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostsEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PostsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _posts2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PostsEvents.emit(event + ':' + doc._id, doc);
    PostsEvents.emit(event, doc);
  };
}

exports.default = PostsEvents;
//# sourceMappingURL=posts.events.js.map
