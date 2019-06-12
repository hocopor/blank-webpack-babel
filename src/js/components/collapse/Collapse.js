import Module from "../Module.js";

const alias = "js-collapse"; // "accordion-item"

const config = {
  classes: {
    root: `${alias}`,
    toggler: `${alias}__toggler`,
    content: `${alias}__content`,
    expanded: `${alias}--expanded`
  }
};

/*

.collapse
  .collapse__toggler
  .collapse__content
    .collapse
      .collapse__toggler
      .collapse__content

  const collapsable = document.querySelectorAll('.collapse');
  collapsable.forEach(function(el) => {
    const collapse = new Collapse(el);
  });

*/

export default class Collapse extends Module {
  elements = {};
  settings = {};

  events = {
    open: "open",
    close: "close"
  };

  constructor(options) {
    super();
    this.settings = Object.assign({}, config, options);
    this._bindEvents();
  }

  _bindEvents() {
    this._onClickHandler = this._onClickHandler.bind(this);
    document.addEventListener("click", this._onClickHandler, true);
  }

  _onClickHandler(e) {
    if (!e.target.matches(`.${this.settings.classes.toggler}`)) return;

    const target = e.target;
    const parent = target.closest(`.${this.settings.classes.root}`);

    this.toggle(parent);
  }

  open(element) {
    element.classList.add(this.settings.classes.expanded);
  }

  close(element) {
    element.classList.remove(this.settings.classes.expanded);
  }

  toggle(element) {
    if (element.classList.contains(this.settings.classes.expanded)) {
      this.close(element);
      $(element).trigger(this.events.close);
    } else {
      this.open(element);
      $(element).trigger(this.events.open);
    }
  }
}
