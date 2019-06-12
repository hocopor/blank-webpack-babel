import EventEmitter from "../../../utils/EventEmitter.js";
import ModalModel from "../models/ModalModel.js";
import ModalView from "../views/ModalView.js";
import ModalController from "../controllers/ModalController.js";

const defaults = {};

function ModalFactory (__options) {
  const options = __options;

  const dispatcher = new EventEmitter();

  const elements = {
    back: null,
    window: null,
    controls: null,
    toolbar: null,
  };

  const model = new ModalModel({ dispatcher });
  const view = new ModalView({ elements, model, dispatcher });
  const controller = new ModalController({ model, view });

  return { controller, model, view };
}

export default ModalFactory;
