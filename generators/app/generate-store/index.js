"use strict";
const { writing: writingSaga } = require("../generate-saga");
const { writing: writingSelector } = require("../generate-selector");
const getCamelName = require("../utils").getCamelName;

module.exports = {
  id: "store",
  name: "New Store",
  async prompting(generator) {
    generator.answers = await generator.prompt([
      {
        type: "confirm",
        name: "inFile",
        message:
          "Create store in 1 file (or create store structure aka '/store/...Reducers.ts etc.')?",
        default: true
      },
      {
        type: "input",
        name: "store",
        message: "Store name"
      },
      {
        type: "input",
        name: "selector",
        message:
          "Selector name (without 'get' prefix, leave an empty to not include selectors)"
      }
    ]);

    generator.answers.store = generator.answers.store.toLowerCase();
    generator.answers.selector = generator.answers.selector.toLowerCase();
  },

  writing(generator) {
    const { inFile, store, selector } = generator.answers;
    const reducer = store;
    const withReducers = reducer.length > 0;
    const withSelectors = selector.length > 0;
    const pathPrefix = inFile ? `${store}` : `${store}/store`;
    const storeCamelName = getCamelName(store);
    const reducerCamelName = getCamelName(reducer);
    const selectorCamelName = getCamelName(selector);

    generator.fs.copyTpl(
      generator.templatePath("./Reducers.ts"),
      generator.destinationPath(`${pathPrefix}/${store}Reducers.ts`),
      {
        store,
        storeCamelName,
        reducer,
        reducerCamelName,
        selector,
        selectorCamelName,
        inFile,
        withReducers,
        withSelectors
      }
    );

    if (!inFile) {
      const templatePath = generator.templatePath();

      generator.sourceRoot(`${templatePath}/../../generate-saga/templates`);
      writingSaga(generator, {}, `${pathPrefix}/`);

      generator.sourceRoot(`${templatePath}/../../generate-selector/templates`);
      writingSelector(generator, {}, `${pathPrefix}/`);
    }
  }
};
