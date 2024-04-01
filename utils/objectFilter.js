module.exports = Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(predicate)
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
