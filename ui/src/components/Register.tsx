import * as React from 'react';

export interface IRegistrationProps {
    onGoogleLogin: () => any,
    onAnonymousLogin: () => any
}
class RegistrationFlow extends React.Component<IRegistrationProps, any, any> {
    public render() {
        return <div className="tile">
            <h1>Register or Login to view App</h1>
            <p>
                This site is an application for visualizing decision tree's. The current example uses the <a href="https://www.pncc.govt.nz/media/3130946/signs-and-use-of-public-places-bylaw-2015-amended-2018.pdf">Palmerston North signs and use of public places bylaw</a>.
            </p>
            <p>
                Feel free to fork this on github from the <a href="https://github.com/ebuckley/decision-tree-ui">Decision Tree UI</a> repo.
            </p>
            <div className="tile__actions">
                <button onClick={this.props.onGoogleLogin}>Login with Google</button>
                <button onClick={this.props.onAnonymousLogin}>Login Anonymously</button>
            </div>
        </div>
    }
}

export default RegistrationFlow;
