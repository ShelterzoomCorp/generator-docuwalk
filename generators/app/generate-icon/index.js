"use strict";
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  id: "icon",
  name: "New Icon",
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
        message: "Icon name(kebab-case)"
      }
    ]);
  },

  writing() {
    const self = this;
    const { name } = self.answers;
    const normalizedName = capitalize(_.camelCase(name));
    const props = {
      name: normalizedName,
      kebabName: name
    };

    this.fs.copyTpl(
      self.templatePath("./index.ts"),
      self.destinationPath(`${normalizedName}/index.ts`),
      props
    );

    this.fs.copyTpl(
      self.templatePath("./Component.tsx"),
      self.destinationPath(`${normalizedName}/${normalizedName}.tsx`),
      props
    );
  }
};
