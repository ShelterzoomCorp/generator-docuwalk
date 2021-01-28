module.exports = {
  id: "story",
  name: "New Story",
  async prompting(generator) {
    generator.answers = await generator.prompt([
      {
        type: "input",
        name: "name",
        message: "Component story name"
      }
    ]);
  },

  writing(generator, pathPrefix = "") {
    const name = generator.answers.name;

    generator.fs.copyTpl(
      generator.templatePath("./Component.story.jsx"),
      generator.destinationPath(`${pathPrefix}${name}.story.jsx`),
      { name }
    );
  }
};
