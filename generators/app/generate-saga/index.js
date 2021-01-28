"use strict";
const getCamelName = require("../utils").getCamelName;

module.exports = {
  id: "saga",
  name: "New Saga",
  async prompting(generator) {
    generator.answers = await generator.prompt([
      {
        type: "input",
        name: "store",
        message: "Store name"
      },
      {
        type: "input",
        name: "reducer",
        message: "Reducer name"
      }
    ]);
    generator.answers.store = generator.answers.store.toLowerCase();
    generator.answers.reducer = generator.answers.reducer.toLowerCase();
  },
  writing(generator, generatorConfig, pathPrefix) {
    const { store, reducer } = generator.answers;
    const storeCamelName = getCamelName(store);
    const finalPathPrefix = pathPrefix || `${store}/`;

    generator.fs.copyTpl(
      generator.templatePath("./Sagas.ts"),
      generator.destinationPath(`${finalPathPrefix}${store}Sagas.ts`),
      { store, storeCamelName, reducer, included: false }
    );
  }
};
