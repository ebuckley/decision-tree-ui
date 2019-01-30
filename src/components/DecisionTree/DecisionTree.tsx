import * as React from 'react';
import { graph } from './d3_tree';
import './graph.css';

const width = 960;

class DecisionTree extends React.Component<any, any, any> {
    public visRef: React.RefObject<SVGSVGElement>;

    constructor(props: any) {
        super(props)
        this.visRef = React.createRef<SVGSVGElement>();
    }
    public componentDidMount() {
        console.log('mounting d3 visualization')
        if (this.visRef.current) {
            const data = {
                children: [
                    { name: 'alpha' },
                    { name: 'beta' }
                ],
                name: 'nullGraph',
            }
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
