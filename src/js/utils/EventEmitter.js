/* global args */
class EventEmitter {
  constructor() {
    this._events = [];
  }

  on(event, listener) {
    if (typeof this._events[event] !== "object") {
      this._events[event] = [];
    }

    this._events[event].push(listener);
  }

  off(event, listener) {
    let index;

    if (typeof this._events[event] === "object") {
      index = this._events[event].indexOf(listener);

      if (index > -1) {
        this._events[event].splice(index, 1);
      }
    }
  }

  emit(event, ...args) {
    let i, listeners, length;

    if (typeof this._events[event] === "object") {
      listeners = this._events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args);
      }
    }
  }

  once(event, listener) {
    this.on(event, function t() {
      this.off(event, t);
      listener.apply(this, args);
    });
  }
}

export default EventEmitter;
