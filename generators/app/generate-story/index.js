const Generator = require("yeoman-generator");
const writing = require("./writing");

module.exports = class extends Generator {
  async prompting() {
    const self = this;
    self.answers = await self.prompt([
      {
        type: "input",
        name: "name",
        message: "Component story name"
      }
    ]);
  }

  writing() {
    const self = this;
    const name = self.answers.name;

    writing.call(this, name);
  }
};
