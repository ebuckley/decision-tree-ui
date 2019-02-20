import * as firebase from 'firebase'
import * as React from 'react';
import { BrowserRouter as Router, NavLink, Route, RouteComponentProps } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import NodeView from './components/NodeView';
import TreeEdit from './components/TreeEdit';
import TreeView from './components/TreeView';
import config from './config';
import { findNode } from './domain/factories';
import { INode } from './domain/model';
import { testModel } from './services/util';

firebase.initializeApp(config.firebase);
interface IAppState {
  nodes: INode[],
  user?: firebase.User
}
function NodeMissing() {
  return (<div>Uh oh! this node has gone missing..</div>)
}
function RegistrationFlow() {
  return (<div>
    
    Log in or register
  </div>)
}

class App extends React.Component<any, IAppState, any> {
  public state = {
    nodes: [],
    user: undefined,
  }

  public componentDidMount() {
    // Are you authenticated?
    // do you have a user profile model?
    // if not: then show registration flow
    firebase.auth().onAuthStateChanged(state => {
      debugger
      if (state) {
        this.setState({ user: state })
      } else {
        this.setState({ user: undefined })
      }
    })
    this.setState({ nodes: testModel })
  }

  public render() {
    if (!this.state.user) {
      return (<RegistrationFlow/>)
    }
    const viewNode = (params: RouteComponentProps) => {
      const param = (params.match.params as any).nodename
      const nodeModel = findNode(this.state.nodes, param)
      if (nodeModel) {
        return (<NodeView context={this.state.nodes} node={nodeModel} />)
      } else {
        return <NodeMissing />
      }
    }

    const renderJson = (params: RouteComponentProps) => (<pre>{JSON.stringify(params.match, null, '  ')}</pre>)
    const renderTree = () => (<TreeView context={this.state.nodes} />)
    const editTree = () => {
      const hte = (c: INode[]) => this.handleTreeEdit(c);
      return <TreeEdit onSave={hte} context={this.state.nodes} />
    }

    return (
      <Router>
        <div>
          <nav>
            <NavLink exact={true} to="/">Home</NavLink>
            <NavLink to="/tree">Tree View</NavLink>
          </nav>
          <Route path="/" render={Home} exact={true} />

          <Route exact={true} path="/n/:nodename" render={viewNode} />
          <Route path="/n/:nodename/edit" render={renderJson} />
          <Route path="/tree/edit" render={editTree} />
          <Route exact={true} path="/tree" render={renderTree} />
        </div>
      </Router>
    );
  }
  public handleTreeEdit(context: INode[]) {
    console.log('update nodes context')
    this.setState({ nodes: context })
  }
}

export default App;
