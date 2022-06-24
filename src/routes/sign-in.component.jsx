import React from 'react';
import { singInWithGooglePopUp, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopUp();
    const docRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
    </div> 
  )
}

export default SignIn