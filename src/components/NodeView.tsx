import * as React from 'react';
import { Link } from 'react-router-dom';
import { INode, IOption } from 'src/domain/model';

export interface INodeViewParams {
    node: INode | undefined
    context: INode[]
}

function RenderOutcome(outcome: IOption): JSX.Element {
    return (<Link key={outcome.name} to={`/n/${outcome.name}`}>
        <button>
            {outcome.label}
        </button>
    </Link>)
}
export function NodeContent(params: { node: INode }): JSX.Element {
    return (<div key={params.node.name} className="tile">
        <h3>{params.node.name}</h3>
        {params.node.description}

        <div className="tile__actions">
            {params.node.outcomes ? params.node.outcomes.map(RenderOutcome) : <span />}
        </div>
    </div>)
}

function Loading() {
    return (<div className="loading" />)
}
class NodeView extends React.Component<INodeViewParams, any, any> {

    public render() {
        if (!this.props.node) {
            return <Loading />
        } else {
            return <NodeContent node={this.props.node} />
        }
    }
}

export default NodeView;
