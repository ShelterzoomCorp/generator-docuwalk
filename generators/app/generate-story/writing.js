module.exports = function(name, pathPrefix = "") {
  this.fs.copyTpl(
    this.templatePath("./Component.story.jsx"),
    this.destinationPath(`${pathPrefix}${name}.story.jsx`),
    { name }
  );
};
