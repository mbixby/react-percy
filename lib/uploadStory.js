"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(percyClient, build, story, widths, minimumHeight, assets, storyHtml) {
    var resource, snapshotOptions, snapshot, missingResources;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            resource = percyClient.makeRootResource(story.name, storyHtml, story.encodedParams);
            snapshotOptions = {
              name: story.name,
              widths,
              minimumHeight,
              enableJavaScript: true
            };
            _context.next = 5;
            return percyClient.createSnapshot(build, [resource], snapshotOptions);

          case 5:
            snapshot = _context.sent;
            missingResources = percyClient.getMissingResourceShas(snapshot);

            if (!(missingResources.length > 0)) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return percyClient.uploadResources(build, [resource]);

          case 10:
            _context.next = 12;
            return percyClient.finalizeSnapshot(snapshot, story.name);

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);

            _context.t0._percy = {
              story
            };
            throw _context.t0;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  function uploadStory(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  }

  return uploadStory;
}();