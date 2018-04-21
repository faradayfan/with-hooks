const withHooks = require('../index').withHooks
const Person = require('./fixtures').Person

describe('withHooks', () => {
  describe('when given configuration object', () => {
    let handlerCalled;
    let hooksConfig;
    let hookDecorator
    beforeEach(() => {
      handlerCalled = false;
      hooksConfig = {
        greeting: {
          type: 'pre',
          func: () => {
            handlerCalled = true
            console.log('pre hook called')
          }
        }
      }
      hookDecorator = withHooks(hooksConfig)
    })
    it('should return a function', () => {
      expect(hookDecorator).to.be.a('function')
    })

    describe('when a class is passed to the returned function', () => {
      let WrappedPerson
      beforeEach(() => {
        WrappedPerson = hookDecorator(Person)
      })

      it('should have extened the class', () => {
        expect(Person.prototype instanceof WrappedPerson).to.be.false
        expect(WrappedPerson.prototype instanceof Person).to.be.true
      })

      describe('when the class is instantiated', () => {
        let spec
        beforeEach(() => {
          spec = new WrappedPerson('test name')
        })
        describe('when a function is called that has hooks added', () => {
          let result
          beforeEach(() => {
            result = spec.greeting()
          })
          it('should call the hooks', () => {
            expect(handlerCalled).to.be.true
          })

          describe('for wrapped functions that have arguments', () => {
            describe('for pre hooks', () => {
              it('the argments passed into the function will be passed into the hook call')
            })
            describe('for post hooks', () => {
              it('the result of the function will be passed into the hook call')
            })
          })
        })
        describe('when a function is called that does not have hooks added.', () => {
          let result
          beforeEach(() => {
            let result = spec.goodbye()
          })
          it('should not call the hooks', () => {
            expect(handlerCalled).to.be.false
          })
        })
      })
    })
  })
})