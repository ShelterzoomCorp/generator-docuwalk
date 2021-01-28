"use strict";
const _ = require("lodash");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  id: "icon",
  name: "New Icon",
  async prompting(generator) {
    generator.answers = await generator.prompt([
      {
        type: "input",
        name: "name",
        message: "Icon name(kebab-case)"
      }
    ]);
  },

  writing(generator) {
    const { name } = generator.answers;
    const normalizedName = capitalize(_.camelCase(name));
    const props = {
      name: normalizedName,
      kebabName: name
    };

    generator.fs.copyTpl(
      generator.templatePath("./Component.tsx"),
      generator.destinationPath(`${normalizedName}.tsx`),
      props
    );
  }
};
