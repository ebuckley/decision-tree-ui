import { INode } from '../domain/model'
export const testModel: INode[] = [
    {
        description: "I can't display a sign",
        isRootNode: false,
        name: 'outcome-can-not-display',
        type: 'outcome',
    },
    {
        description: "I can display a sign",
        isRootNode: false,
        name: 'outcome-can-display',
        type: 'outcome',
    },
    {
        description: "Would you like to display a sign?",
        isRootNode: true,
        name: 'intent-to-display-display-sign',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-can-not-display',
            },
            {
                label: 'YES',
                name: 'outcome-can-display',
            }
        ],
        type: 'question'
    }
]
