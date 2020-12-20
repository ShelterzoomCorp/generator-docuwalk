"use strict";
const chalk = require("chalk");
const yosay = require("yosay");
const writingStory = require("../generate-story/writing");

// @TODO finish based on
// https://github.com/microsoft/vscode-generator-code/blob/master/generators/app/generate-colortheme.js
module.exports = {
  id: "component",
  name: "New Component",
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
        name: "name",
        message: "Component name"
      },
      {
        type: "confirm",
        name: "storybook",
        message: "Add storybook?",
        default: true
      }
    ]);
  },

  writing() {
    const self = this;
    const { name, storybook } = self.answers;

    this.fs.copyTpl(
      self.templatePath("./index.ts"),
      self.destinationPath(`${name}/index.ts`),
      { name }
    );

    this.fs.copyTpl(
      self.templatePath("./Component.tsx"),
      self.destinationPath(`${name}/${name}.tsx`),
      { name }
    );

    if (storybook) {
      this.sourceRoot(`${this.templatePath()}/../../story/templates`);
      writingStory.call(this, name, `${name}/`);
    }
  }
};
