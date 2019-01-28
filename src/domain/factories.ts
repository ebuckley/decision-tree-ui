import { INode, RootQuestion } from './model';

export function getRootQuestions(nodes: INode[]): RootQuestion[] {
    return nodes.filter(node => node.isRootNode)
        .map(m => new RootQuestion(m));
}