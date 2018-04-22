const EventEmitter = require('events')

module.exports = class EventMapper {
  constructor(events = {}) {
    this.emitter = new EventEmitter()
    Object.keys(events).forEach((k) => {
      if (events[k].pre) {
        this.emitter.on(`${k}:pre`, events[k].pre.func)
        this[`${k}:pre`] = (...args) => { this.emitter.emit(`${k}:pre`, ...args) }
      }
      if (events[k].post) {
        this.emitter.on(`${k}:post`, events[k].post.func);
        this[`${k}:post`] = (...args) => { this.emitter.emit(`${k}:post`, ...args) }
      }
    })
  }
}