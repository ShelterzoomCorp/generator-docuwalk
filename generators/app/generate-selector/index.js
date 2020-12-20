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
        name: "selector",
        message: "Selector name (without 'get' prefix)"
      }
    ]);
    self.answers.store = self.answers.store.toLowerCase();
    self.answers.selector = self.answers.selector.toLowerCase();
  }

  writing() {
    const self = this;
    const { store, selector } = self.answers;
    const selectorCamelName = getCamelName(selector);

    writing.call(this, store, selector, selectorCamelName, `${store}/`);
  }
};
