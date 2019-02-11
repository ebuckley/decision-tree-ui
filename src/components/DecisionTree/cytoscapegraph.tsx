// TS_IGNORE
import * as React from 'react';
import { createCytoGraphElementsFromNodes } from 'src/domain/factories';
import { INode } from 'src/domain/model';
const cytoscape: any = require('cytoscape');
const dagre: any = require('cytoscape-dagre');

interface IGraphProps {
    tree: INode[]
}

export default class GraphView extends React.Component<IGraphProps, any> {
    public visRef: React.RefObject<HTMLDivElement>
    constructor(props: any) {
        super(props)
        this.visRef = React.createRef<HTMLDivElement>();
    }
    public componentDidMount() {
        if (this.visRef.current) {
            const elements = createCytoGraphElementsFromNodes(this.props.tree)
            cytoscape.use(dagre);
            const cy = cytoscape({
                container: this.visRef.current,
                elements,

                style: [ // the stylesheet for the graph
                    {
                        selector: 'node',
                        style: {
                            'background-color': ele => {
                                const data: INode = ele.data('node');
                                if (data.type === 'outcome') {
                                    return '#F8B500';
                                }
                                if (data.isRootNode) {
                                    return '#00ADB5';
                                }
                                return '#777';
                            },
                            'label': 'data(id)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'label': 'data(option.label)',
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'width': 3
                        }
                    }
                ],

                layout: {
                    name: 'dagre',
                    rankDir: 'LR',
                    rankSep: 120,
                },
                maxZoom: 2,
                minZoom: 0.11,
            })
            cy.on('tap', e => {
                if (e.target === cy) {
                    console.log('tap on background', e.target);
                } else {
                    console.log('tap on some element', e.target.data());
                }
            })
        } else {
            console.error('mounted component, but the dom reference for the graph does not exist yet!?')
        }
    }
    public render() {
        return (<div
            className='graph-view-container'
            ref={this.visRef} />)
    }
}
