import * as React from 'react';
import { BrowserRouter as Router, Link, Route, RouteComponentProps } from 'react-router-dom';
import './App.css';
import NodeView from './components/NodeView';
import TreeEdit from './components/TreeEdit';
import TreeView from './components/TreeView';
import { findNode } from './domain/factories';
import { INode } from './domain/model';
import { testModel } from './services/util';

const Home = () => {
  return (<div className="tile">
    <h1> Test Digital bylaws here. </h1>
    <Link to="/tree/edit">
      <button>
        EDIT TREE
      </button>
    </Link>
    <button>
      START
  </button>
  </div>)
}

interface IAppState {
  nodes: INode[]
}
class App extends React.Component<any, IAppState, any> {
  public state = {
    nodes: []
  }

  public componentDidMount() {
    this.setState({ nodes: testModel })
  }

  public render() {
    const viewNode = (params: RouteComponentProps) => {
      // ts = crazy :\
      const param = (params.match.params as any).nodename
      return (<NodeView context={this.state.nodes} node={findNode(this.state.nodes, param)} />)
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
            <Link to="/">Home</Link>
            <Link to="/tree">Tree View</Link>
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
