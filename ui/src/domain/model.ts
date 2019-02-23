// tslint:disable:max-classes-per-file

export class INode {
    public name: string;
    public description: string;
    public type: string;
    public isRootNode: boolean;
    public outcomes?: IOption[];
    constructor(context: any) {
        Object.assign(this, context);
    }
}

export class Question extends INode {
    public name: string;
    public description: string;
    public isRootNode: boolean;
    public outcomes: IOption[];
    public type = 'question';
}

export class Outcome extends INode {
    public name: string;
    public description: string;
    public isRootNode: boolean;
    public type = 'outcome';
}

export class RootQuestion extends INode {
    public name: string;
    public description: string;
    public isRootNode = true;
    public type = 'question';
}

// OptionsClass
export interface IOption {
    name: string;
    label: string;
    node?: INode;
} 
