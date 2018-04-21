const EventMapper = require('./EventMapper')
const _ = require('lodash')

const TYPES = {
  PRE: 'pre',
  POST: 'post'
}

module.exports = events => P => {
  let eventEmitter = new EventMapper(events);
  return class extends P {
    constructor(...args) {
      super(...args)

      _.intersection(
        Object.keys(events),
        Object.getOwnPropertyNames(P.prototype))
        .forEach(k => {
          switch (events[k].type) {
            case TYPES.PRE:
              this[k] = (...args) => {
                eventEmitter[k](...args)
                let result = super[k](...args)
                return result
              }
              break
            case TYPES.POST:
              this[k] = (...args) => {
                let result = super[k](...args)
                eventEmitter[k](result)
                return result
              }
              break
          }
        })
    }
  }
}