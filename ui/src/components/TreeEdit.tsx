import * as React from 'react';
import { Link } from 'react-router-dom'
import { INode } from 'src/domain/model';

export interface ITreeEditParams {
    context: INode[]
    onSave: (content: INode[]) => void
}
export interface ITreeEditState {
    textValue: string;
}



export default class TreeEdit extends React.Component<ITreeEditParams, ITreeEditState, any> {

    public state = {
        textValue: ''
    }

    constructor(props: any) {
        super(props);
        this.state.textValue = JSON.stringify(this.props.context, null, ' ');
    }

    public componentWillReceiveProps(nextProps: ITreeEditParams) {

        const newTextValue = JSON.stringify(nextProps.context, null, '  ')
        try {
            const oldTextValue = JSON.stringify(JSON.parse(this.state.textValue), null, '  ')
            if (newTextValue !== oldTextValue) {
                this.setState({ textValue: newTextValue })
            }
        } catch {
            // Update the state of the tree if there is a new text value, but the oldtextvalue can't be parsed for whatever reason...
            this.setState({ textValue: newTextValue })
        }
    }

    public render() {
        const handleSave = () => this.props.onSave(JSON.parse(this.state.textValue))
        const handleChange = (ev: any) => this.handleChange(ev)

        return (<div className="tile">
            <h1>Tree Edit</h1>
            <div className="textarea-container">
                <textarea value={this.state.textValue} onChange={handleChange} />
            </div>
            <div className="tile__actions">
                <button onClick={handleSave}>SAVE</button>
                <Link to="/tree">
                    <button>DISCARD</button>
                </Link>
            </div>

        </div>)
    }

    private handleChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ textValue: ev.target.value })
    }
}
