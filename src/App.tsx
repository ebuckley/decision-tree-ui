import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css';


const Home = () => <div><h1> Hello world </h1></div>

const RenderNode = (params) => {
  params
};

class App extends React.Component {
  public render() {
    const renderJson = ({ match }) => (
      <pre>{JSON.stringify(match)}</pre>
    )
    return (
      <Router>
        <div>
          <Route path="/" render={Home} exact={true} />

          <Route path="/n/:nodename" render={renderJson} />
        </div>
      </Router>
    );
  }
}

export default App;
