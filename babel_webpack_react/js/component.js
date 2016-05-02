import React from 'react'
import ActionCreator from './ActionCreator'
import Store from './Store'
import EventEmitter from './EventEmitter'

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: store.getCount()};
    store.on('CHANGE', () => {
      this._onChange();
    });
  }
  _onChange() {
    console.trace();
    this.setState({count: store.getCount()});
  }
  tick(actionType) {
    switch (actionType) {
      case 'INCREMENT':
        action.updateCount(this.state.count + 1);
        break;
      case 'DECREMENT':
        action.updateCount(this.state.count - 1);
        break;
      case 'INCREMENT_ASYNC':
        setTimeout(() => {
          action.updateCount(this.state.count + 1);
        }, 2000);
        break;
      default:
        break;
     }
  }
  render() {
    return (
      <div>
        <button onClick={this.tick.bind(this, 'INCREMENT')}>Count Up</button>
        <button onClick={this.tick.bind(this, 'DECREMENT')}>Count Down</button>
        <button onClick={this.tick.bind(this, 'INCREMENT_ASYNC')}>Count Up Async</button>
        <p>
          Count: <span> {this.state.count} </span>
        </p>
      </div>
    );
  }
}
