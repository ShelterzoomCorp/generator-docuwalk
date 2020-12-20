module.exports = function(store, storeCamelName, reducer, pathPrefix = "") {
  this.fs.copyTpl(
    this.templatePath("./Sagas.ts"),
    this.destinationPath(`${pathPrefix}${store}Sagas.ts`),
    { store, storeCamelName, reducer, included: false }
  );
};
