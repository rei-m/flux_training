import ActionCreator from './js/ActionCreator'
import Store from './js/Store'
import EventEmitter from './js/EventEmitter'

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);
