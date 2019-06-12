/* global process */
import EventBus from "./services/EventBus.js";
import Store from "./services/Store.js";
import { findComponents } from "./utils/DomWorker.js";

const defaults = {
  debug: process.env.NODE_ENV === "development"
};

class App {
  static init(element = document.documentElement, settings = {}) {
    const app = new App(element, settings);
    app.start();
    return app;
  }

  constructor(element, settings) {
    this.dispatcher = EventBus;
    this.store = Store;
    this.config = Object.assign(defaults, settings, window.gon);
    this.definitions = {};
    this.instances = {};
  }

  async start() {
    await domReady();
    this.initComponents();
  }

  register(name, object) {
    this.definitions[name] = object;
  }

  saveComponent(id, object) {
    this.instances[id] = object;
  }

  loadComponent(id, object) {
    this.instances[id] = object;
  }

  initComponents() {
    const components = findComponents();
    components.forEach(element => {
      let componentName = element.getAttribute("data-component");
      let componentTitle = element.getAttribute("data-component-title");
      let component = this.definitions[componentName];
      let dataset = element.dataset;
      if (typeof component == "function") {
        let componentInstance = new component(element, dataset);
        this.saveComponent(
          `${componentName}.${componentTitle}`,
          componentInstance
        );
      } else if (this.config.debug) {
        // eslint-disable-next-line no-console
        console.warn(`${componentName} didn't registered.`);
      }
    });
  }
}

function domReady() {
  return new Promise(resolve => {
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });
}

export default App;

// index.js

/*
import App from "app.js"
const app = new App();
// app = { config: {...}, dispatcher: EventBus, store: {...} }

// some_component.js
define("cart", CartComponent);
// and dont export
*/
