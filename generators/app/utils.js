exports.getCamelName = function(name) {
  if (!name || !name.length) return "";

  return name[0].toUpperCase() + name.slice(1);
};
