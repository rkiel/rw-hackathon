var React       = require('react');
var PlayerStore = require('./PlayerStore');

function getInitialState() {
  return {
    us:   PlayerStore.getOurScore(),
    them: PlayerStore.getTheirScore()
  };
}

function componentDidMount() {
  PlayerStore.addListener(_onStoreChange.bind(this));
}

function componentWillUnmount() {
  PlayerStore.removeListener(_onStoreChange.bind(this));
}

function render() {
  return (
    <div className="well well-sm">
      <button className='btn'>{ this.state.us }</button>
      <button className='btn'>{ this.state.them }</button>
    </div>
  );
}


var Banner = React.createClass({
  getInitialState: getInitialState,
    componentDidMount: componentDidMount,
    componentWillUnmount: componentWillUnmount,
  render:          render
});

module.exports = Banner;

function _onStoreChange() {
  this.setState({
    us:   PlayerStore.getOurScore(),
    them: PlayerStore.getTheirScore()
  });
}
