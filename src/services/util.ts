import { INode } from '../domain/model'
export const testModel: INode[] = [
    {
        description: "You will need to apply for a permit to display this sign",
        isRootNode: false,
        name: 'outcome-can-not-display',
        type: 'outcome',
    },
    {
        description: "You may display the sign",
        isRootNode: false,
        name: 'outcome-can-display',
        type: 'outcome',
    },

    {
        description: "Is the sign visible by the public?",
        isRootNode: true,
        name: 'is-sign-publically-visible',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-can-display'
            },
            {
                label: 'YES',
                name: 'is-sign-objectionable'
            }
        ],
        type: 'question'
    },
    {
        description: 'Does the sign have objectionable content? Note that objectionable is at the discretion of council.',
        isRootNode: false,
        name: 'is-sign-objectionable',
        outcomes: [
            {
                label: 'NO',
                name: 'is-type-temporary'
            },
            {
                label: 'YES',
                name: 'outcome-can-not-display'
            }
        ],
        type: 'question',
    },
    {
        description: 'Is the sign a temporary fixture?',
        isRootNode: false,
        name: 'is-type-temporary',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-mobile'
            },
            {
                label: 'YES',
                name: 'is-sign-for-commercial-purpose'
            }
        ],
        type: 'question',
    },
    {
        description: 'Is the sign on a trailer, or painted on a vehicle?',
        isRootNode: false,
        name: 'is-sign-mobile',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-for-commercial-purpose'
            },
            {
                label: 'YES',
                name: 'is-sign-within-dimension-contstraints'
            }
        ],
        type: 'question',
    },
    {
        description: 'Is the sign used for commercial purposes?',
        isRootNode: false,
        name: 'is-sign-for-commercial-purpose',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-can-display'
            },
            {
                label: 'YES',
                name: 'outcome-can-not-display-sign'
            }
        ],
        type: 'question',
    },
    { // TODO write up appropriate outcomes for Yes answer
        description: 'Is the sign within dimension requirements (mobile type of sign)?',
        isRootNode: false,
        name: 'is-sign-within-dimension-contstraints',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-need-a-permit'
            },
            {
                label: 'YES',
                name: 'outcome-can-not-display-sign'
            }
        ],
        type: 'question',
    },
    {
        description: 'You must apply for a permit',
        isRootNode: false,
        name: 'outcome-need-a-permit',
        type: 'outcome',
    }
    // TODO continue implementation from the Determine adjacency outcome

]
