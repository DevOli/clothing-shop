import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

import SignUpForm from '../components/sign-up-form/sign-up.component';
import SignInForm from '../components/sign-in-form/sign-in-form';
import './auth.styles.scss'

const AuthPage = () => {
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const docRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])
  
  return (
    <div className='auth-container'>
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default AuthPage;
