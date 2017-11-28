'use strict';

var webHandler = require('../../utils/webHandler');
var Regex = require('regexper.js');

/**
 * Expose the BusinessAPI object
 */

module.exports = {
  /**
   * GetNews 获取新闻列表
   */
  GetNews: async function GetNews() {
    var result = [];
    var html = await webHandler.Get('https://www.gxb.io', '', false);
    var regex = new Regex('<li><a [\\s\\S]+?\\s*href="([^"]+)"[\\s\\S]+?>([^<]+)[\\s\\S]+?(\\d+-\\d+-\\d+)', 'ig');
    var newMatches = regex.matches(html);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = newMatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var match = _step.value;

        result.push({
          title: match.groups[2],
          content_url: match.groups[1],
          dateTime: match.groups[3]
        });
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

    return result;
  },
  /**
   * GetPartners 获取合作伙伴列表
   */
  GetPartners: async function GetPartners() {
    var result = [];
    var html = await webHandler.Get('https://www.gxb.io/', '', false);
    var regex = new Regex('<li>\\s*([^<]+)\\s*<\\/li>', 'ig');
    var partnersMatches = regex.matches(html);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = partnersMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var match = _step2.value;

        result.push(match.groups[1]);
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

    return result;
  }
};