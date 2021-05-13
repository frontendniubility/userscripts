"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require('fs').promises;

var path = require('path');

var p = function p() {
  var _console;

  return (_console = console).log.apply(_console, arguments), arguments.length <= 0 ? undefined : arguments[0];
};

var parseMeta = function parseMeta(script) {
  return script.slice(script.indexOf('==UserScript=='), script.indexOf('==/UserScript==')).split('\n').map(function (line) {
    return line.match(/@([a-z]+)\s*([^\n]+)/i);
  }).filter(function (match) {
    return match;
  }).reduce(function (meta, _ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        key = _ref2[1],
        value = _ref2[2];

    return Object.assign(meta, _defineProperty({}, key, value.trim()));
  }, {});
};

var scriptData = function scriptData(files, folder, file) {
  return {
    file: file,
    folder: folder,
    path: path.join(folder, file),
    hasReadme: files.some(function (file) {
      return file.includes('README');
    })
  };
};

var sourcepath = path.resolve(__dirname, 'src');

var getScripts = function getScripts() {
  return fs.readdir(sourcepath).then(function (filenames) {
    return filenames.filter(function (file) {
      return !file.startsWith('.');
    });
  }).then(function (filenames) {
    return filenames.map(function (file) {
      return path.resolve(sourcepath, file);
    });
  }).then(function (files) {
    return Promise.all(files.map(function (maybeDir) {
      return fs.stat(maybeDir).then(function (handle) {
        return handle.isDirectory() ? fs.readdir(maybeDir).then(function (files) {
          return [files, files.find(function (file) {
            return file.endsWith('.user.es6') || file.endsWith('.user.js');
          })];
        }).then(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              files = _ref4[0],
              file = _ref4[1];

          return file && scriptData(files, maybeDir, file);
        }) : void 0;
      });
    }));
  }).then(function (scripts) {
    return scripts.filter(Boolean);
  }).then(function (scripts) {
    return Promise.all(scripts.map(function (script) {
      return fs.readFile(script.path).then(function (buf) {
        return _objectSpread({}, script, {}, parseMeta(buf.toString()));
      });
    }));
  });
};

var baseUrl = 'https://github.com/niubilityfrontend/userscripts';
var tableHeader = '|Name|Links||\n|-|:-:|:-:|\n';

var formatScriptLine = function formatScriptLine(script) {
  var installLink = "".concat(baseUrl, "/raw/master/dist/").concat(path.parse(script.file).name, ".js");
  var infoLink = script.hasReadme && "".concat(baseUrl, "/tree/master/src/").concat(path.parse(script.folder).name);
  return "|".concat(script.name, "|").concat(infoLink ? "[Info](".concat(infoLink, ")") : '_no readme_', "|[Install](").concat(installLink, ")|");
};

var buildReadme = function buildReadme() {
  return getScripts().then(function (scripts) {
    return fs.readFile('README.template.md').then(function (buf) {
      return buf.toString().replace('<SCRIPTS>', tableHeader + scripts.filter(function (script) {
        return script.deprecated !== 'true';
      }).map(formatScriptLine).join('\n')).replace('<UNMAINTAINED>', tableHeader + scripts.filter(function (script) {
        return script.deprecated === 'true';
      }).map(formatScriptLine).join('\n'));
    });
  }).then(function (readme) {
    return fs.writeFile('./README.md', readme);
  });
};

buildReadme();