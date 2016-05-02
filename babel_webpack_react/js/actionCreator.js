export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  updateCount(data){
    this.dispatcher.emit("updateCount", data);
  }
}
