const withHooks = require('../').withHooks

// simple class with a function
class Cat {
  constructor(name) {
    this.name = name
  }

  getGreeting(greeted) {
    return `${this.name} greets ${greeted}`
  }
}


// define the hooks config object
let config = {
  getGreeting: {
    pre: {
      func: (...args) => {
        console.log(`config pre arguments: ${args}`)
      }
    },
    post: {
      func: (results) => {
        console.log(`config post results: ${results}`)
      }
    }
  }
}

console.log(`\nWrapping Cat with hooks\n`)
const CatWithHooks = withHooks(config)(Cat)
let garfield = new CatWithHooks('Garfield')
garfield.getGreeting('Dave')


let config2 = {
  getGreeting: {
    pre: {
      func: (name) => {
        console.log(`config2 pre arguments: ${name}`)
      }
    }
  }
}

console.log(`\nWrapping CatWithHooks with more hooks\n`)
const CatWithMoreHooks = withHooks(config2)(CatWithHooks)
let felix = new CatWithMoreHooks('Felix')
felix.getGreeting('Inky')