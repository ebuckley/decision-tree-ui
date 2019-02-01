import { getRootQuestions } from './factories';
const testSet = [
    {
        description: "I can't display a sign",
        isRootNode: false,
        name: 'outcome-can-not-display',
        type: 'outcome',
    },
    {
        description: "I can display a sign",
        isRootNode: false,
        name: 'outcome-can-display-sign',
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
                node: undefined
            },
            {
                label: 'YES',
                name: 'outcome-can-display',
                node: undefined
            }
        ],
        type: 'question'
    }
]

it('can serialize root nodes', () => {
    const rootNodes = getRootQuestions(testSet)
    expect(rootNodes).toHaveLength(1);
});
