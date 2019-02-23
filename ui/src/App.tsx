import * as firebase from 'firebase'
import * as React from 'react';
import { BrowserRouter as Router, NavLink, Route, RouteComponentProps } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import NodeView from './components/NodeView';
import Profile from './components/Profile';
import RegistrationFlow from './components/Register';
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

class App extends React.Component<any, IAppState, any> {

  public state = {
    nodes: [],
    user: undefined,
  }

  public componentDidMount() {
    // Handle user authentication state!
    firebase.auth().onAuthStateChanged(state => {
      if (state) {
        this.setState({ user: state })
      } else {
        this.setState({ user: undefined })
      }
      const docPath = ``
      firebase.firestore().doc(docPath)
    })
    this.setState({ nodes: testModel })
  }

  public render() {
    if (!this.state.user) {
      const loginGoogle = () => this.loginGoogle();
      const loginAnon = () => this.loginAnonymously();
      return (<RegistrationFlow onGoogleLogin={loginGoogle} onAnonymousLogin={loginAnon} />)
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

    const onLogout = () => this.logout();
    const renderProfile = () => {
      const user = this.state.user;
      if (user) {
        return (<Profile user={user} onLogout={onLogout}/>);
      } else {
        return (<span>No user logged in</span>);
      }
    }


    return (
      <Router>
        <div>
          <nav>
            <NavLink exact={true} to="/">Home</NavLink>
            <NavLink to="/tree">Tree View</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
          <Route path="/" render={Home} exact={true} />

          <Route path="/profile" render={renderProfile} />
          <Route exact={true} path="/n/:nodename" render={viewNode} />
          <Route path="/n/:nodename/edit" render={renderJson} />
          <Route path="/tree/edit" render={editTree} />
          <Route exact={true} path="/tree" render={renderTree} />
        </div>
      </Router>
    );
  }
  private logout(): any {
    if (this.state.user) {
      firebase.auth().signOut()
    }
  }
  private handleTreeEdit(context: INode[]) {
    console.log('update nodes context')
    this.setState({ nodes: context })
  }

  private loginGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  private loginAnonymously() {
    firebase.auth().signInAnonymously()
  }
}

export default App;
