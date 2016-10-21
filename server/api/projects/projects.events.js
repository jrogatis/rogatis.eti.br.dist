/**
 * Thing model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _projects = require('./projects.model');

var _projects2 = _interopRequireDefault(_projects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectsEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ProjectsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _projects2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ProjectsEvents.emit(event + ':' + doc._id, doc);
    ProjectsEvents.emit(event, doc);
  };
}

exports.default = ProjectsEvents;
//# sourceMappingURL=projects.events.js.map
