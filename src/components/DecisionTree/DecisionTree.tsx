import * as React from 'react';
import { createGraphModelFromDecisionTree } from 'src/domain/factories';
import { RootQuestion } from 'src/domain/model';
import { graph } from './d3_tree';
import './graph.css';
const width = 960;

interface IDecisionTreeProps {
    tree: RootQuestion;
}
class DecisionTree extends React.Component<IDecisionTreeProps, any, any> {
    public visRef: React.RefObject<SVGSVGElement>;

    constructor(props: any) {
        super(props)
        this.visRef = React.createRef<SVGSVGElement>();
    }

    public componentDidMount() {
        const data = createGraphModelFromDecisionTree(this.props.tree)
        if (this.visRef.current) {
            graph(width, this.visRef.current, data);
        } else {
            console.error('Reference to html element was not found!')
        }
    }
    public render() {
        return (<div>
            <svg
                ref={this.visRef}
                width={width}
                height={500}
                viewBox="0,0,960,500"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>)
    }
}

export default DecisionTree;
