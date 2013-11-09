module.exports = process.env.REFRACTORY_COV
  ? require('./lib-cov/refractory')
  : require('./lib/refractory');
