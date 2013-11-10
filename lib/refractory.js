/**
 * Core dependencies.
 */

var path = require('path');

/**
 * Module not found code.
 */

var MODULE_NOT_FOUND = 'MODULE_NOT_FOUND';

/**
 * Load a file.
 *
 * `refractory` will search the paths in the order specified
 * for each module provided on `load`.
 *
 * @param {Object} module (contains filename to resolve from)
 * @param {String} path(s) to search
 * @param ...
 * @returns {Function} file loader
 * @api public
 */

function load(mod) {
  var base = path.dirname(mod.filename);
  var folders = [].slice.call(arguments, 1);

  return function refractory() {
    var files = [].slice.call(arguments);
    var paths = [];

    files
    .map(function(file) {
      return path.basename(file);
    })
    .forEach(function(file) {
      folders.forEach(function(folder) {
        folder = parsePaths(folder);
        folder = path.resolve(base, folder);
        paths.push(path.join(folder, file));
      });

      paths.push(file);
    });

    for (var i = 0, len = paths.length; i < len; i++) {
      try {
        return require(paths[i]);
      } catch (err) {
        if (err.code != MODULE_NOT_FOUND) throw err;
      }
    }

    var err = new Error("Couldn't load file(s): \"" + files.join(', ') + '"');
    err.code = MODULE_NOT_FOUND;
    err.paths = paths;
    throw err;
  };
}


function parsePaths(str) {
  return str.replace(/\{\{(.*?)\}\}/g, function(match, key) {
    return 'string' === typeof load[key] ? load[key] : '';
  });
}

/**
 * Export home path for use in join statements.
 */

load.HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

/**
 * Primary export.
 */

module.exports = load;
