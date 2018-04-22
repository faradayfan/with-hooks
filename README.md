## with-hooks

This is a simple package that allows you to add hooks to class prototype methods. 

### Usage

Define a class
```javascript
class Cat {
  constructor(name) {
    this.name = name
  }

  getGreeting(greeted) {
    return `${this.name} greets ${greeted}`
  }
}
```

Define the with-hooks config object
```javascript
let config = {
  getGreeting: { // this name matches name of function
    pre: { 
      func: (...args) => {
        console.log(`getGreeting pre hook: ${args}`)
      }
    },
    post: {
      func: (results) => {
        console.log(`getGreeting post hook: ${results}`)
      }
    }
  }
}
```

Wrap the `Cat` class with the hooks
```javascript
const CatWithHooks = withHooks(config)(Cat)
```

Instantiate a `CatWithHooks` object
``` javascript
let garfield = new CatWithHooks('Garfield')
```

Now when `getGreeting` is invoked, the functions you defined in the configuration object will be called.
``` javascript
garfield.getGreeting('Dave')
```
