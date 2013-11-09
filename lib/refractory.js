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
 * refractory will seach in the following paths:
 *
 * - `main`/file
 * - $HOME/`homesub`/path
 * - file (if it is a node module)
 *
 * @param {String} main path, example: ../lib/curiosity/formatters
 * @param {String} home subfolder, example: .curiosity/formatters
 * @returns {Function} file loader
 * @api public
 */

function load(main, homesub) {
  return function refractory(file) {
    file = path.basename(file);

    var paths = [
      path.join(main, file),
      path.join(load._home, homesub, file),
      file,
    ];

    for (var i = 0, len = paths.length; i < len; i++) {
      try {
        return require(paths[i]);
      } catch (err) {
        if (err.code != MODULE_NOT_FOUND) throw err;
      }
    }

    var err = new Error("Couldn't load file: \"" + file + '"');
    err.code = MODULE_NOT_FOUND;
    err.paths = paths;
    throw err;
  };
}

/**
 * Export home path for debugging and testing.
 */

load._home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

/**
 * Primary export.
 */

module.exports = load;
