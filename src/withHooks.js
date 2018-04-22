const EventMapper = require('./EventMapper')
const _ = require('lodash')


module.exports = config => P => {
  let eventEmitter = new EventMapper(config);
  //console.log('outside', config)
  class WithHooks extends P {
    constructor(...args) {
      super(...args)
      _.intersection(
        Object.keys(config),
        Object.getOwnPropertyNames(P.prototype))
        .forEach(k => {
          WithHooks.prototype[k] = (...args) => {
            if (config[k].pre) {
              eventEmitter[k + ':pre'](...args)
            }

            let result = P.prototype[k].call(this, ...args)

            if (config[k].post) {
              eventEmitter[k + ':post'](result)
            }
            return result
          }
        })

    }
  }
  return WithHooks
}