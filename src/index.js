import "babel-polyfill";
import App from "./js/app.js";

// Components
import Modal from "./js/components/modal/Modal.js";

const app = App.init();
app.register("modal", Modal);

//
//  Styles
//
import "./index.css";
