"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

const component = require("./generate-component");
const icon = require("./generate-icon");
const saga = require("./generate-saga");
const selector = require("./generate-selector");
const store = require("./generate-store");
const story = require("./generate-story");
const extensionGenerators = [component, icon, saga, selector, store, story];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.extensionConfig = Object.create(null);
    this.extensionConfig.installDependencies = false;

    this.extensionGenerator = undefined;

    this.abort = false;
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the classy ${chalk.red("generator-docuwalk")} generator!`
      )
    );

    // Ask for extension type
    const extensionType = this.options.extensionType;
    if (extensionType) {
      const extensionTypeId = "ext-" + extensionType;
      if (extensionGenerators.find(g => g.id === extensionTypeId)) {
        this.extensionConfig.type = extensionTypeId;
      } else {
        this.log(
          "Invalid extension type: " +
            extensionType +
            "\nPossible types are: " +
            extensionGenerators.map(g => g.id.substr(4)).join(", ")
        );
        this.abort = true;
      }
    } else {
      const choices = [];
      for (const g of extensionGenerators) {
        const name = this.extensionConfig.insiders ? g.insidersName : g.name;
        if (name) {
          choices.push({ name, value: g.id });
        }
      }

      this.extensionConfig.type = (
        await this.prompt({
          type: "list",
          name: "type",
          message: "What type of extension do you want to create?",
          pageSize: choices.length,
          choices
        })
      ).type;
    }

    this.extensionGenerator = extensionGenerators.find(
      g => g.id === this.extensionConfig.type
    );
    try {
      await this.extensionGenerator.prompting(this, this.extensionConfig);
    } catch (e) {
      console.log(e);
      this.abort = true;
    }
  }

  // Write files
  writing() {
    if (this.abort) {
      return;
    }

    this.sourceRoot(
      path.join(__dirname, `./generate-${this.extensionConfig.type}/templates/`)
    );

    return this.extensionGenerator.writing(this, this.extensionConfig);
  }
};
