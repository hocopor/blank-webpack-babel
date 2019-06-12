import EventBus from "../../services/EventBus.js";
import EventEmitter from "../../utils/EventEmitter.js";
import ModalFactory from "./utils/ModalFactory.js";
import ModalService from "./service/ModalService.js";
import Component from "../Component.js";
// app.findComponent("modal.bonuses")

/*

How to use:
<div data-component="modal" data-toolbar="" data-title="Рады видеть вас" data-name="bonuses" data-actions="accept|close|cancel" data-animation="scale"
... or ...
new Modal(name, options);

*/

// Services
const bus = EventBus;

const defaultOptions = {};

class Modal extends Component {
  constructor(__element, __options = {}) {
    const element = __element;
    const options = Object.assign({}, defaultOptions, __options);
    const { controller, model, view } = new ModalFactory(element, options);
    return new ModalService({ controller });
  }
}

export default Modal;
