import { INode, RootQuestion } from './model';

export function getRootQuestions(nodes: INode[]): RootQuestion[] {
    return nodes.filter(node => node.isRootNode)
        .map(m => new RootQuestion(m));
}

export function findNode(nodes: INode[], name: string): INode | undefined {
    return nodes.find(n => n.name === name);
}
