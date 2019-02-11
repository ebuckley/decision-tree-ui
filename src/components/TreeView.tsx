import * as React from 'react';
// import { Link } from 'react-router-dom';
import { INode } from 'src/domain/model';
import GraphView from './DecisionTree/cytoscapegraph';

export interface ITreeViewParams {
    context: INode[]
}

// function RenderNode(n: INode): JSX.Element {
//     return (<tr key={n.name}>
//         <td>
//             <Link to={`/n/${n.name}`}>
//                 {n.name}
//             </Link>
//         </td>
//         <td>{n.description}</td>
//         <td>{n.outcomes ? n.outcomes.length : 0}</td>
//     </tr>)
// }

export default function TreeView(props: ITreeViewParams): JSX.Element {
    let cytoGraph = (<div>Loading Tree...</div>)
    if (props.context.length) {
        cytoGraph = <GraphView tree={props.context} />
    }

    return (<div>
        {cytoGraph}
    </div>
    )
}
