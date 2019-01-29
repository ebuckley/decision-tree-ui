import * as React from 'react';
import { Link } from 'react-router-dom';
import { INode } from 'src/domain/model';

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
    return (<div className="tile">
        <h1>Tree View</h1>
        <table>
            {props.context.map(RenderNode)}
        </table>
        <Link to="/tree/edit">
            <button>
                EDIT TREE
            </button>
        </Link>

    </div>)
}
