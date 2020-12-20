module.exports = function(store, selector, selectorCamelName, pathPrefix = "") {
  this.fs.copyTpl(
    this.templatePath("./Selectors.ts"),
    this.destinationPath(`${pathPrefix}${store}Selectors.ts`),
    { store, selector, selectorCamelName, included: false }
  );
};
