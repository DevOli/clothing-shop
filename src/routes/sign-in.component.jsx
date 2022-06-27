import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import {
  auth,
  singInWithGooglePopUp,
  singInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';
import SignUpForm from '../components/sign-up-form/sign-up.component';

const SignIn = () => {
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const docRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])

  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopUp();
    const docRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with popup</button>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignIn;
