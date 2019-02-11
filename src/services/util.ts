import { INode } from '../domain/model'
export const testModel: INode[] = [
    {
        description: "You will need to apply for a permit to display this sign",
        isRootNode: false,
        name: 'outcome-must-apply-for-permit',
        type: 'outcome',
    },
    {
        description: "You may display the sign",
        isRootNode: false,
        name: 'outcome-can-display',
        type: 'outcome',
    },
    {
        description: "You will need to apply for a permit to display this sign",
        isRootNode: false,
        name: 'outcome-must-apply-for-permit',
        type: 'outcome',
    },
    {
        description: "You must not display the sign",
        isRootNode: false,
        name: 'outcome-can-not-display-sign',
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
                name: 'outcome-must-apply-for-permit'
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
                name: 'is-mobile-sign-within-constraints'
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
    {
        description: 'Is the mobile sign larger than 3 square meters?',
        isRootNode: false,
        name: 'is-mobile-sign-within-constraints',
        outcomes: [
            {
                label: 'NO',
                name: 'is-adjacent-to-residential-area'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },

    {
        description: `Is the sign placed on Residential or Village zoned land or on a road reserve adjacent to these zones?`,
        isRootNode: false,
        name: 'is-adjacent-to-residential-area',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-competitive'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the sign placed outside a business deemed to be in competition with the business or activity?`,
        isRootNode: false,
        name: 'is-sign-competitive',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-acceptable-height'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the top of the sign more than 4 metres from the ground?`,
        isRootNode: false,
        name: 'is-sign-acceptable-height',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-must-apply-for-permit'
            },
            {
                label: 'YES',
                name: 'is-sign-within-vehicle-footprint'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the sign extending outside the footprint of the vehicle or trailer?`,
        isRootNode: false,
        name: 'is-sign-within-vehicle-footprint',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-secured-to-vehicle'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the sign securely fastened to the vehicle?`,
        isRootNode: false,
        name: 'is-sign-secured-to-vehicle',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-close-to-intersection'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the sign within 25 meters of any intersection?`,
        isRootNode: false,
        name: 'is-sign-close-to-intersection',
        outcomes: [
            {
                label: 'NO',
                name: 'is-mobile-sign-obscuring-advisory-signage'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the mobile sign parked in a way that obscures street/advisory signage?`,
        isRootNode: false,
        name: 'is-mobile-sign-obscuring-advisory-signage',
        outcomes: [
            {
                label: 'NO',
                name: 'is-sign-on-trailer'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the sign on a trailer, and detached from a vehicle?`,
        isRootNode: false,
        name: 'is-sign-close-to-intersection',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-can-display-sign'
            },
            {
                label: 'YES',
                name: 'is-trailer-positioned-away-from-flow'
            }
        ],
        type: 'question',
    },
    {
        description: `Is the trailer hitch facing the flow of traffic?`,
        isRootNode: false,
        name: 'is-trailer-positioned-away-from-flow',
        outcomes: [
            {
                label: 'NO',
                name: 'outcome-can-display-sign'
            },
            {
                label: 'YES',
                name: 'outcome-must-apply-for-permit'
            }
        ],
        type: 'question',
    },
]
