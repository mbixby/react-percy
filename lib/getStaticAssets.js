'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStaticAssets;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

// Some build assets we never want to upload.
var SKIPPED_ASSETS = ['index.html', 'iframe.html', 'favicon.ico', 'static/', /\.map$/, /\.log$/, /\.DS_Store$/];
var MAX_FILE_SIZE_BYTES = 15728640; // 15MB.

// Synchronously walk the build directory, read each file
function gatherBuildResources(buildDir) {
  var hashToResource = {};
  var walkOptions = {
    // Follow symlinks because many assets in the ember build directory are just symlinks.
    followLinks: true,

    listeners: {
      file(root, fileStats, next) {
        var absolutePath = _path2.default.join(root, fileStats.name);
        var resourceUrl = absolutePath.replace(buildDir, '');

        if (_path2.default.sep === '\\') {
          // Windows support: transform filesystem backslashes into forward-slashes for the URL.
          resourceUrl = resourceUrl.replace('\\', '/');
        }

        // Remove the leading /
        if (resourceUrl.charAt(0) === '/') {
          resourceUrl = resourceUrl.substr(1);
        }

        for (var assetPattern in SKIPPED_ASSETS) {
          if (resourceUrl.match(SKIPPED_ASSETS[assetPattern])) {
            next();
            return;
          }
        }

        // Skip large files.
        if (fs.statSync(absolutePath).size > MAX_FILE_SIZE_BYTES) {
          // eslint-disable-next-line no-console
          console.warn('\n[percy][WARNING] Skipping large file: ', resourceUrl);
          return;
        }

        // TODO(fotinakis): this is synchronous and potentially memory intensive, but we don't
        // keep a reference to the content around so this should be garbage collected. Re-evaluate?
        var content = fs.readFileSync(absolutePath);

        hashToResource[encodeURI(resourceUrl)] = content;
        next();
      }
    }
  };
  _walk2.default.walkSync(buildDir, walkOptions);

  return hashToResource;
}

function getStaticAssets() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Load iframe.html that is used for every snapshot asset
  var storybookStaticPath = _path2.default.resolve(options.buildDir);
  var storyHtml = fs.readFileSync(_path2.default.join(storybookStaticPath, 'iframe.html'), 'utf8');

  // Load the special static/preview.js that contains all stories
  var storybookJavascriptPath = storyHtml.match(/<script src="(.*?static\/preview.*?)"><\/script>/)[1];
  var storyJavascript = fs.readFileSync(_path2.default.join(storybookStaticPath, storybookJavascriptPath), 'utf8');

  // Load other build assets
  var assets = gatherBuildResources(options.buildDir);
  assets[storybookJavascriptPath] = storyJavascript;

  return { storyHtml, assets, storybookJavascriptPath };
}