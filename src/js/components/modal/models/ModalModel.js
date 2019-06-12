class ModalModel {
  constructor({ dispatcher }) {
    this.dispatcher = dispatcher;
    this.state = null;
    this.content = null;
  }

  beforeOpen() {}
  afterOpen() {}

  beforeClose() {}
  afterClose() {}

}
export default ModalModel;
