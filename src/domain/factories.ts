import { INode, RootQuestion } from './model';

export function getRootQuestions(nodes: INode[]): RootQuestion[] {
    return nodes.filter(node => node.isRootNode)
        .map(m => new RootQuestion(m));
}

export function findNode(nodes: INode[], name: string): INode | undefined {
    return nodes.find(n => n.name === name);
}

export function createTreeFromNodes(nodes: INode[]): RootQuestion {
    const root = nodes.find(n => n.isRootNode);
    if (root) {
        if (root.outcomes) {
            root.outcomes = root.outcomes.map(outcome => {
                outcome.node = nodes.find(n => n.name === outcome.name)
                if (outcome.node) {
                    outcome.node = updateNodeWithChildren(nodes, outcome.node);
                    return outcome;
                } else {
                    console.warn('unable to find node related to outcome: ', outcome);
                    return outcome
                }
            })
        }
        return new RootQuestion(root);
    } else {
        throw new Error('Could not find a root node')
    }
}

// recurively link up all the nodes into a tree structure. 
export function updateNodeWithChildren(context: INode[], node: INode): INode {
    if (!node.outcomes) {
        return node;
    } else {
        node.outcomes.map(o => {
            const childNode = context.find(n => n.name === o.name);
            if (!childNode) {
                return o;
            }
            o.node = updateNodeWithChildren(context, childNode);
            return o
        });
        return node;
    }
}

// Given a roote question Recursivly build a structure that looks like this...
//     {
//         name:
//         children: [{name: ,children: []}]
//     }
export function createGraphModelFromDecisionTree(node: RootQuestion | undefined): any {

    if (!node) {
        throw new Error('rootQuestionToDecisionTree was called with a fake node');
    }

    if (!node.outcomes || node.outcomes.length === 0) {
        return {
            children: [],
            name: node.name,
        }
    } else {
        return {
            children: node.outcomes
                .filter(o => !!o.node)
                .map(o => createGraphModelFromDecisionTree(o.node)),
            name: node.name,
        }
    }
}


export function createCytoGraphElementsFromNodes(context: INode[]): any {
    // get all node data
    const nodes: any[] = [];
    let edges: any[] = []
    context.forEach(n => {
        nodes.push({ data: { id: n.name, node: n } })
        if (n.outcomes && n.outcomes.length) {
            const nodeEdges = n.outcomes.map(o => {
                const edgeName = n.name + '->' + o.name
                return {
                    data: {
                        id: edgeName,
                        option: o,
                        source: n.name,
                        target: o.name,
                    }
                }
            })
            edges = edges.concat(nodeEdges)
        }
    })
    return nodes.concat(edges);
}