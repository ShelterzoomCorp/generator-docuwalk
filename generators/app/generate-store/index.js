"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const writingSaga = require("../generate-saga/writing");
const writingSelector = require("../selector/writing");
const getCamelName = require("../utils").getCamelName;

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Welcome to the perfect ${chalk.red(
          "@shelterzoom/generator-fe"
        )} generator!`
      )
    );

    const self = this;
    self.answers = await self.prompt([
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

    self.answers.store = self.answers.store.toLowerCase();
    self.answers.selector = self.answers.selector.toLowerCase();
  }

  writing() {
    const self = this;
    const { inFile, store, selector } = self.answers;
    const reducer = store;
    const withReducers = reducer.length > 0;
    const withSelectors = selector.length > 0;
    const pathPrefix = inFile ? `${store}` : `${store}/store`;
    const storeCamelName = getCamelName(store);
    const reducerCamelName = getCamelName(reducer);
    const selectorCamelName = getCamelName(selector);

    this.fs.copyTpl(
      self.templatePath("./Reducers.ts"),
      self.destinationPath(`${pathPrefix}/${store}Reducers.ts`),
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
      const templatePath = this.templatePath();

      this.sourceRoot(`${templatePath}/../../saga/templates`);
      writingSaga.call(this, store, storeCamelName, reducer, `${pathPrefix}/`);

      this.sourceRoot(`${templatePath}/../../selector/templates`);
      writingSelector.call(
        this,
        store,
        selector,
        selectorCamelName,
        `${pathPrefix}/`
      );
    }
  }
};
