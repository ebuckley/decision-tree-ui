// import * as firebase from 'firebase';
// import 'firebase/auth';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const onStart = () => {
        // const provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider)
        // console.log('starting digital bylaw test now')
    };
    return (
        <div className="tile">
            <h1> Explore provision 6 of the bylaw </h1>
            <p>
                This site represents the output of a one day hack on digital legislation by Media suite and Palmerston North City Council. Choose start to interactivley explore the question model developed to represent the outcomes of provision 6 of <a href="https://www.pncc.govt.nz/media/3130946/signs-and-use-of-public-places-bylaw-2015-amended-2018.pdf">the palmerston north signs and use of public places bylaw</a>.
            </p>
            <div className="tile__actions">
                <Link to="/tree/edit">
                    <button>
                        EDIT TREE
                </button>
                </Link>
                <Link to="/tree">
                    <button>
                        VIEW TREE
                </button>
                </Link>
                <Link to="/n/is-sign-publically-visible">
                    <button onClick={onStart}>
                        START
                </button>
                </Link>
            </div>
        </div>)
}
