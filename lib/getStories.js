'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// jsdom doesn't support Web Workers yet.
// We use workerMock to allow the user's preview.js to interact with the Worker API.
var workerMock = `
    function MockWorker(path) {
      var api = this;

      function addEventListener() {}
      function removeEventListener() {}
      function postMessage() {}
      function terminate() {}

      api.postMessage = postMessage;
      api.addEventListener = addEventListener;
      api.removeEventListener = removeEventListener;
      api.terminate = terminate;

      return api;
    }
    window.Worker = MockWorker;
`;

// jsdom doesn't support localStorage yet.
// We use localStorageMock to allow the user's preview.js to interact with localStorage.
var localStorageMock = `
    var localStorageMock = (function() {
      var store = {};
      return {
        getItem: function(key) {
          return store[key];
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    `;

// jsdom doesn't support matchMedia yet.
var matchMediaMock = `
    window.matchMedia = window.matchMedia || (() => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      };
    });
    `;

function getStoriesFromDom(previewJavascriptCode, options) {
  return new _promise2.default(function (resolve, reject) {
    var jsDomConfig = {
      html: '',
      url: 'https://example.com/iframe.js?selectedKind=none&selectedStory=none',
      src: [workerMock, localStorageMock, matchMediaMock, previewJavascriptCode],
      done: function done(err, window) {
        if (err) return reject(err.response.body);
        if (!window || !window.__storybook_stories__) {
          var message = 'Storybook object not found on window. Check ' + 'window.__storybook_stories__ is set in your Storybook\'s config.js.';
          reject(new Error(message));
        }
        resolve(window.__storybook_stories__);
      }
    };
    if (options.debug) {
      jsDomConfig.virtualConsole = _jsdom2.default.createVirtualConsole().sendTo(console);
    }
    _jsdom2.default.env(jsDomConfig);
  });
}

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(storybookCode) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var stories;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!storybookCode || storybookCode === '')) {
              _context.next = 2;
              break;
            }

            throw new Error('Storybook code was not received.');

          case 2:
            _context.next = 4;
            return getStoriesFromDom(storybookCode, options);

          case 4:
            stories = _context.sent;
            return _context.abrupt('return', stories);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function getStories(_x2) {
    return _ref.apply(this, arguments);
  }

  return getStories;
}();