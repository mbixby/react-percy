"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = selectStories;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectStories(stories, rtlRegex) {
  var selectedStories = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(stories), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var group = _step.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(group.stories), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _story = _step3.value;

          var name = `${group.kind}: ${_story.name}`;
          var encodedParams = `selectedKind=${encodeURIComponent(group.kind)}` + `&selectedStory=${encodeURIComponent(_story.name)}`;

          selectedStories.push({
            name,
            encodedParams
          });
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (rtlRegex) {
    var rtlStories = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(selectedStories), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var story = _step2.value;

        if (story.name.match(rtlRegex)) {
          rtlStories.push({
            name: `${story.name} [RTL]`,
            encodedParams: `${story.encodedParams}&direction=rtl`
          });
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    selectedStories = selectedStories.concat(rtlStories);
  }

  return selectedStories;
}