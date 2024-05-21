import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    //console.log(app)
    const provider = new (GoogleAuthProvider);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const LoggedInUser = result.user;
                setUser(LoggedInUser);

            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .cath(error => {
                console.log('error', error.message)
            })
    }


    return (
        <div>
            {user ?
                <button onClick={handleSignOut}>SignOut</button> :
                <button onClick={handleGoogleSignIn}>Google login</button>
            }
            {user && <div>
                <h1>User: {user.displayName}</h1>
                <h2>Email:{user.email}</h2>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;