'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _uploadStories = require('./uploadStories');

var _uploadStories2 = _interopRequireDefault(_uploadStories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(client, selectedStories, widths, minimumHeight, storyHtml, assets) {
    var snapshotPluralization;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            snapshotPluralization = selectedStories.length === 1 ? 'snapshot' : 'snapshots';
            // eslint-disable-next-line no-console

            console.log('\nUploading', selectedStories.length, snapshotPluralization, 'to Percy.');

            // const resources = client.makeResources(assets);
            // const build = await client.createBuild(resources);
            // const missingResources = client.getMissingResources(build, resources);
            // await client.uploadResources(build, missingResources);
            // await uploadStories(client, build, selectedStories, widths, minimumHeight, assets, storyHtml);
            // await client.finalizeBuild(build);

            // eslint-disable-next-line no-console
            console.log('Percy snapshots uploaded. Visual diffs are now processing:', build.attributes['web-url']);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function uploadStorybook(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  }

  return uploadStorybook;
}();