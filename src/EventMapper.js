const EventEmitter = require('events')

module.exports = class EventMapper {
  constructor(events = {}) {
    this.emitter = new EventEmitter()
    Object.keys(events).forEach((k) => {
      this.emitter.on(k, events[k].func);
      this[k] = (...args) => { this.emitter.emit(k, ...args) }
    })
  }
}