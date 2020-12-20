"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const getCamelName = require("../utils").getCamelName;
const writing = require("./writing");

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
    self.answers.store = self.answers.store.toLowerCase();
    self.answers.reducer = self.answers.reducer.toLowerCase();
  }

  writing() {
    const self = this;
    const { store, reducer } = self.answers;
    const storeCamelName = getCamelName(store);

    writing.call(this, store, storeCamelName, reducer, `${store}/`);
  }
};
