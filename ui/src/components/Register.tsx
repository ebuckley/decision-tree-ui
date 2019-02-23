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
                decisions.ersin.nz is an application for visualizing decision tree's. The current example will create a 
            </p>
            <div className="tile__actions">
                <button onClick={this.props.onGoogleLogin}>Login with Google</button>
                <button onClick={this.props.onAnonymousLogin}>Login Anonymously</button>
            </div>
        </div>
    }
}

export default RegistrationFlow;