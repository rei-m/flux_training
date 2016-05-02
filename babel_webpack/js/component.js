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
    this.elem.addEventListener('click', () => {
      this.tick();
    });
    this.render();
  }
  _onChange() {
    this.state = {count: store.getCount()};
    this.render()
  }
  tick() {
    action.countUp(this.state.count + 1);
  }
  render() {
    this.textCount.innerText = this.state.count;
  }
}
