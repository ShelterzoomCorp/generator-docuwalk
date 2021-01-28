"use strict";
const { writing, id } = require("../generate-story");

module.exports = {
  id: "component",
  name: "New Component",
  async prompting(generator) {
    generator.answers = await generator.prompt([
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

  writing(generator) {
    const { name, storybook } = generator.answers;
    generator.fs.copyTpl(
      generator.templatePath("./index.ts"),
      generator.destinationPath(`${name}/index.ts`),
      { name }
    );

    generator.fs.copyTpl(
      generator.templatePath("./Component.tsx"),
      generator.destinationPath(`${name}/${name}.tsx`),
      { name }
    );

    if (storybook) {
      generator.sourceRoot(
        `${generator.templatePath()}/../../generate-${id}/templates`
      );
      writing(generator, `${name}/`);
    }
  }
};
