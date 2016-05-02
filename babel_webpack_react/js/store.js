import Emitter from './EventEmitter'

export default class Store extends Emitter {
  constructor(dispatcher) {
    super();
    this.count = 0;
    dispatcher.on('updateCount', this.onUpdateCount.bind(this));
  }

  getCount() {
    return this.count;
  }

  onUpdateCount(count) {
    this.count = count;
    this.emit('CHANGE');
  }
}
