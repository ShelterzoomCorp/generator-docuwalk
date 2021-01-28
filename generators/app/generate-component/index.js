"use strict";
const writingStory = require("../generate-story/writing");

module.exports = {
  id: "component",
  name: "New Component",
  async prompting(self) {
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

  writing(self) {
    const { name, storybook } = self.answers;
    self.fs.copyTpl(
      self.templatePath("./index.ts"),
      self.destinationPath(`${name}/index.ts`),
      { name }
    );

    self.fs.copyTpl(
      self.templatePath("./Component.tsx"),
      self.destinationPath(`${name}/${name}.tsx`),
      { name }
    );

    if (storybook) {
      // @TODO fix after refactor story
      self.log(`path::${self.templatePath()}`);
      self.sourceRoot(`${self.templatePath()}/../../story/templates`);
      writingStory.call(self, name, `${name}/`);
    }
  }
};
