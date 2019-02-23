import * as React from 'react';
import { findNode } from 'src/domain/factories';
import { INode, IOption } from 'src/domain/model';
import GraphView from './DecisionTree/cytoscapegraph';

export interface ITreeViewParams {
    context: INode[]
}
export interface ITreeViewState {
    activeNode?: INode
}

export function NodeView(params: { node: INode, onOutcome: (opt: IOption) => any }): JSX.Element {

    const renderOutcome = (outcome: IOption) => {
        const onClick = () => params.onOutcome(outcome)
        return <button onClick={onClick} key={outcome.name}>{outcome.label}</button>
    }

    return (<div key={params.node.name} className="tile graph-node-dialog">
        <h3>{params.node.name}</h3>
        <p>
            {params.node.description}
        </p>
        <div className="tile__actions">
            {params.node.outcomes ? params.node.outcomes.map(renderOutcome) : <span />}
        </div>
    </div>)
}


function GraphInformation() {
    return (<div className="tile anchor-top-right graph-information">
        <p>
            You can drag, pinch and zoom around to view this graph.
            Tap a node to bring up the question at that point.
        </p>
    </div>)
}


export default class Treeview extends React.Component<ITreeViewParams, ITreeViewState> {
    public state: ITreeViewState = {};
    public render() {
        let cytoGraph = (<div>Loading Tree...</div>)
        const displayNode = (n: INode) => {
            this.setState({ activeNode: n })
        }
        const onOutcomeSelected = (opt: IOption) => {
            const activeNode = findNode(this.props.context, opt.name)
            if (!activeNode) {
                console.warn('WOOPS! could not find the node for option', opt)
            }
            this.setState({ activeNode })
        }

        if (this.props.context.length) {
            cytoGraph = <GraphView activeNode={this.state.activeNode} onNodeClick={displayNode} tree={this.props.context} />
        }

        return (<div>
            {(this.state.activeNode ? <NodeView onOutcome={onOutcomeSelected} node={this.state.activeNode} /> : <span />)}
            <GraphInformation />
            {cytoGraph}
        </div>
        )
    }
}
