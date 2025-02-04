import { useState } from 'react';
import { createAuthUserWithEmailAndpassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import Button from '../button/button.component';

const defaultForm = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultForm);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password did not matched!!");
    }

    try {
      const { user } = await createAuthUserWithEmailAndpassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use' ) {
        alert("User already exists");
      }
      console.log('Error when creting user', error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Name"}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label={"Email"}
          type="email"
          required
          onChange={handleChange}
          name={'email'}
          value={email}
        />        
        <FormInput
         label={"Password"}
          type="password"
          required
          onChange={handleChange}
          name={'password'}
          value={password}
        />
        <FormInput
         label={"Confirm Password"}
          type="password"
          required
          onChange={handleChange}
          name={'confirmPassword'}
          value={confirmPassword}
        />
        <Button type="submit">
          Sign-up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
