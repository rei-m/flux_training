import ActionCreator from './ActionCreator'
import Store from './Store'
import EventEmitter from './EventEmitter'

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

export default class Component {
  constructor(elem) {
    this.elem = elem;
    this.state = {count: store.getCount()};
    store.on('CHANGE', () => {
      this._onChange();
    });

    this.textCount = this.elem.querySelector('#text-tount');

    this.elem.querySelector('#button__count-up').addEventListener('click', () => {
      action.updateCount(this.state.count + 1);
    });

    this.elem.querySelector('#button__count-down').addEventListener('click', () => {
      action.updateCount(this.state.count - 1);
    });

    this.elem.querySelector('#button__count-up--async').addEventListener('click', () => {
      setTimeout(() => {
        action.updateCount(this.state.count + 1);
      }, 2000);
    });

    this.render();
  }
  _onChange() {
    console.trace();
    this.state = {count: store.getCount()};
    this.render()
  }
  render() {
    this.textCount.innerText = this.state.count;
  }
}
