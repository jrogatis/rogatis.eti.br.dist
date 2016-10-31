/**
 * Thing model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _pageInfos = require('./pageInfos.model');

var _pageInfos2 = _interopRequireDefault(_pageInfos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageInfosEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PageInfosEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _pageInfos2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PageInfosEvents.emit(event + ':' + doc._id, doc);
    PageInfosEvents.emit(event, doc);
  };
}

exports.default = PageInfosEvents;
//# sourceMappingURL=pageInfos.events.js.map
