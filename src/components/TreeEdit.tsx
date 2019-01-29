import * as React from 'react';
import { Link } from 'react-router-dom'
import { INode } from 'src/domain/model';

export interface ITreeViewParams {
    context: INode[]
}


export default function TreeEdit(props: ITreeViewParams): JSX.Element {
    return (<div className="tile">
        <h1>Tree Edit</h1>
        <div className="textarea-container">
            <textarea value={JSON.stringify(props.context, null, '    ')} />
        </div>
        <div className="tile__actions">
            <button>SAVE</button>
            <Link to="/tree">
                <button>DISCARD</button>
            </Link>
        </div>

    </div>)
}
