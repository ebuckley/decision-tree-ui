import * as React from 'react';
export default function Profile(props: {user: firebase.User, onLogout: any}) {
    const greeting = props.user.displayName ? "Hello " + props.user.displayName: "Hell anon.";
    return (<div className="tile">
        <h1>{greeting}</h1>
        <div className="tile__actions">
            <button onClick={props.onLogout}>Logout</button>
        </div>
    </div>)
}