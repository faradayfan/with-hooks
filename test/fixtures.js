module.exports.Person = class Person {
  constructor(name) {
    this.name = name
  }

  greeting() {
    return `Hello, my name is ${this.name}.`
  }

  async goodbye() {
    return `It was nice meeting you!`
  }
}