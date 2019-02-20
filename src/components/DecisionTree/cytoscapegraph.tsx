// TS_IGNORE
import * as React from 'react';
import { createCytoGraphElementsFromNodes } from 'src/domain/factories';
import { INode } from 'src/domain/model';
const cytoscape: any = require('cytoscape');
const dagre: any = require('cytoscape-dagre');

interface IGraphProps {
    activeNode?: INode,
    tree: INode[]
    onNodeClick: (n?: INode) => any;
}

export default class GraphView extends React.Component<IGraphProps, any> {
    public visRef: React.RefObject<HTMLDivElement>
    private cy: any; // reference to a cytoscape graph
    constructor(props: any) {
        super(props)
        this.visRef = React.createRef<HTMLDivElement>();
    }
    public componentDidMount() {
        if (this.visRef.current) {
            const elements = createCytoGraphElementsFromNodes(this.props.tree)
            cytoscape.use(dagre);
            this.cy = cytoscape({
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
                    },
                    {
                        selector: 'node:selected',
                        style: {
                            'background-color': '#FC3C3C'
                        }
                    },
                    {
                        selector: 'node:visited',
                        style: {
                            'background-color': '#FC3C3C'
                        }
                    }
                ],

                layout: {
                    name: 'dagre',
                    nodeSep: 60,
                    rankDir: 'LR',
                    spacingFactor: 2.5,
                },
                maxZoom: 2,
                minZoom: 0.11,
            })
            this.cy.on('tap', e => {
                if (e.target === this.cy) {
                    console.log('tap on background', e.target);
                    this.props.onNodeClick();
                } else {
                    console.log('tap on some element', e.target.data());
                    this.props.onNodeClick(e.target.data('node'))
                }
            })
        } else {
            console.error('mounted component, but the dom reference for the graph does not exist yet!?')
        }
    }

    public componentWillReceiveProps(nextProps: IGraphProps) {
        if (nextProps.activeNode) {
            const newActiveNode = nextProps.activeNode
            console.log('transition to a new node!', nextProps.activeNode)
            const eles = this.cy.elements()
            eles.unselect()
            eles.forEach(ele => {
                // find node in graph
                const id = ele.data('id');
                if (id === newActiveNode.name) {
                    console.log('selecting node!')
                    this.cy.animate({
                        fit: {
                            eles: ele,
                            padding: 300
                        }
                    }, {
                            duration: 300
                        })
                    ele.classes('visited')
                    return false
                }
                return true;
            })
        }
    }

    public render() {
        return (<div
            className='graph-view-container'
            ref={this.visRef} />)
    }
}
