import React, { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';
import {
  auth,
  singInWithGooglePopUp,
  singInWithGoogleRedirect,
  createUserDocumentFromAuth,
  singInWithEmailPassword
} from '../../utils/firebase/firebase.utils';
import './sign-in.styles.scss'

const defaultValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const { email, password } = formValues;

  const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    setFormValues(defaultValues)
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const user = await singInWithEmailPassword( email, password)
      console.log(user);
      setCurrentUser(user);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Incorrect password for email')
      } else {
        console.log('Email or passwor dincorrect',  error)
      }
    }
    resetFormFields();
  };

  const handleSignInGoogle = async () => {
    const { user } = await singInWithGooglePopUp();
    await createUserDocumentFromAuth(user);
    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput
          label={'Email'}
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label={'Password'}
          type="password"
          required
          onChange={handleChange}
          name={'password'}
          value={password}
        />
        <div className='buttons-container'>
          <Button type="submit">
            Sign in
          </Button>
          <Button
            type="button"
            buttonType="google"           
            onClick={handleSignInGoogle}
          >
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
