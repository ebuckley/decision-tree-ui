import * as React from 'react';
import { Link } from 'react-router-dom';
import { INode } from 'src/domain/model';
import DecisionTree from './DecisionTree/DecisionTree';

export interface ITreeViewParams {
    context: INode[]
}

function RenderNode(n: INode): JSX.Element {
    return (<tr key={n.name}>
        <td>
            <Link to={`/n/${n.name}`}>
                {n.name}
            </Link>
        </td>
        <td>{n.description}</td>
        <td>{n.outcomes ? n.outcomes.length : 0}</td>
    </tr>)
}

export default function TreeView(props: ITreeViewParams): JSX.Element {
    return (<div>

        <DecisionTree />
        <div className="tile">
            <h1>Tree View</h1>
            <table>
                <tbody>
                    {props.context.map(RenderNode)}
                </tbody>
            </table>
            <Link to="/tree/edit">
                <button>
                    EDIT TREE
            </button>
            </Link>
        </div>
    </div>
    )
}
