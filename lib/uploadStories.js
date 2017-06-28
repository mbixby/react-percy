'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = uploadStories;

var _es6PromisePool = require('es6-promise-pool');

var _es6PromisePool2 = _interopRequireDefault(_es6PromisePool);

var _uploadStory = require('./uploadStory');

var _uploadStory2 = _interopRequireDefault(_uploadStory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var concurrency = 5;

function uploadStories(percyClient, build, stories, widths, minimumHeight, assets, storyHtml) {
  var _marked = [generatePromises].map(_regenerator2.default.mark);

  function generatePromises() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, story;

    return _regenerator2.default.wrap(function generatePromises$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = (0, _getIterator3.default)(stories);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            story = _step.value;
            _context.next = 9;
            return (0, _uploadStory2.default)(percyClient, build, story, widths, minimumHeight, assets, storyHtml);

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }

  var pool = new _es6PromisePool2.default(generatePromises(), concurrency);
  return pool.start();
}