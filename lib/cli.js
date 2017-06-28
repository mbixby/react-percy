'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// eslint-disable-next-line import/prefer-default-export
var run = exports.run = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var widths, minimumHeight, rtlRegex, options, _getStaticAssets, storyHtml, assets, storybookJavascriptPath, stories, selectedStories;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = (0, _yargs2.default)(argv).usage(args.usage).help().alias('help', 'h').options(args.options).epilogue(args.docs).default('build_dir', 'storybook-static').default('minimum_height', '800').argv;

            if (!argv.help) {
              _context.next = 4;
              break;
            }

            _yargs2.default.showHelp();
            return _context.abrupt('return');

          case 4:
            if (!argv.version) {
              _context.next = 7;
              break;
            }

            process.stdout.write(`v${VERSION}\n`);
            return _context.abrupt('return');

          case 7:
            widths = (0, _getWidths2.default)(argv.widths);
            minimumHeight = (0, _getMinimumHeight2.default)(argv.minimum_height);
            rtlRegex = (0, _getRtlRegex2.default)(argv.rtl, argv.rtl_regex);
            options = {
              debug: argv.debug,
              buildDir: argv.build_dir
            };

            if (!(process.env.PERCY_ENABLE === '0')) {
              _context.next = 14;
              break;
            }

            // eslint-disable-next-line no-console
            console.log('The PERCY_ENABLE environment variable is set to 0. Exiting.');
            return _context.abrupt('return');

          case 14:
            if (process.env.PERCY_TOKEN) {
              _context.next = 16;
              break;
            }

            throw new Error('The PERCY_TOKEN environment variable is missing.');

          case 16:
            if (process.env.PERCY_PROJECT) {
              _context.next = 18;
              break;
            }

            throw new Error('The PERCY_PROJECT environment variable is missing.');

          case 18:
            _getStaticAssets = (0, _getStaticAssets3.default)(options), storyHtml = _getStaticAssets.storyHtml, assets = _getStaticAssets.assets, storybookJavascriptPath = _getStaticAssets.storybookJavascriptPath;

            debug('assets %o', assets);

            _context.next = 22;
            return (0, _getStories2.default)(assets[storybookJavascriptPath], options);

          case 22:
            stories = _context.sent;

            debug('stories %o', stories);

            selectedStories = (0, _selectStories2.default)(stories, rtlRegex);

            debug('selectedStories %o', selectedStories);

            if (!(selectedStories.length === 0)) {
              _context.next = 29;
              break;
            }

            console.log('WARNING: No stories were found.'); // eslint-disable-line no-console
            return _context.abrupt('return');

          case 29:
            return _context.abrupt('return', (0, _uploadStorybook2.default)(null, selectedStories, widths, minimumHeight, storyHtml, assets));

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function run(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _args2 = require('./args');

var args = _interopRequireWildcard(_args2);

var _getStories = require('./getStories');

var _getStories2 = _interopRequireDefault(_getStories);

var _getStaticAssets2 = require('./getStaticAssets');

var _getStaticAssets3 = _interopRequireDefault(_getStaticAssets2);

var _getWidths = require('./getWidths');

var _getWidths2 = _interopRequireDefault(_getWidths);

var _getMinimumHeight = require('./getMinimumHeight');

var _getMinimumHeight2 = _interopRequireDefault(_getMinimumHeight);

var _getRtlRegex = require('./getRtlRegex');

var _getRtlRegex2 = _interopRequireDefault(_getRtlRegex);

var _selectStories = require('./selectStories');

var _selectStories2 = _interopRequireDefault(_selectStories);

var _uploadStorybook = require('./uploadStorybook');

var _uploadStorybook2 = _interopRequireDefault(_uploadStorybook);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('percy-storybook');
var VERSION = require('../package.json').version;