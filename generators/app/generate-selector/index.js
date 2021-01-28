"use strict";
const getCamelName = require("../utils").getCamelName;

module.exports = {
  id: "selector",
  name: "New Selector",
  async prompting(generator) {
    generator.answers = await generator.prompt([
      {
        type: "input",
        name: "store",
        message: "Store name"
      },
      {
        type: "input",
        name: "selector",
        message: "Selector name (without 'get' prefix)"
      }
    ]);
    generator.answers.store = generator.answers.store.toLowerCase();
    generator.answers.selector = generator.answers.selector.toLowerCase();
  },

  writing(generator, generatorConfig, pathPrefix) {
    const { store, selector } = generator.answers;
    const selectorCamelName = getCamelName(selector);
    const finalPathPrefix = pathPrefix || `${store}/`;

    generator.fs.copyTpl(
      generator.templatePath("./Selectors.ts"),
      generator.destinationPath(`${finalPathPrefix}${store}Selectors.ts`),
      { store, selector, selectorCamelName, included: false }
    );
  }
};
