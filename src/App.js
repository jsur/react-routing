import React from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';

// const history = createHistory();

// second argument is the location in context
const Route = ({ path, component }, { location }) => {
  const pathname = location.pathname;
  if (pathname.match(path)) {
    return (
      React.createElement(component)
    );
  } else {
    return null;
  }
};

// IMPORTANT: to receive context a component must white-list 
// which parts of the context it should receive.
Route.contextTypes = {
  location: PropTypes.object
};

const Link = ({ to, children }, { history }) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    // enables the user to hover over links to see where they go
    href={to}
  >
    {
      // children is a special prop
      // it is a reference to all React elements contained inside of our Link component
      children
    }
  </a>
);

Link.contextTypes = {
  history: PropTypes.object
};

class Router extends React.Component {

  // static allows us to define a property on the class 
  // Router itself as opposed to instances of Router
  static childContextTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.history = createHistory();
    this.history.listen(() => this.forceUpdate());
  }

  getChildContext() {
    return {
      history: this.history,
      location: window.location
    };
  }

  render() {
    return this.props.children;
  }

}

class App extends React.Component {

  /*componentDidMount() {
    // history object's listen() is passed a function that
    // is invoked every time the history stack is modified
    history.listen(() => this.forceUpdate());
  }*/

  render() {
    return (
      <Router>
        <div
          className='ui text container'
        >
          <h2 className='ui dividing header'>
            Which body of water?
          </h2>

          <ul>
            <li>
              <Link to='/atlantic'>
                <code>/atlantic</code>
              </Link>
            </li>
            <li>
              <Link to='/pacific'>
                <code>/pacific</code>
              </Link>
            </li>
          </ul>

          <hr />

          <Route path='/atlantic' component={Atlantic} />
          <Route path='/pacific' component={Pacific} />
        </div>
      </Router>
    );
  }
}

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

export default App;
