import { useState } from 'react';
import { createAuthUserWithEmailAndpassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
      const userCredentials = await createAuthUserWithEmailAndpassword(email, password);
      const docRef = await createUserDocumentFromAuth(userCredentials.user, {displayName});
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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name={'email'}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name={'password'}
          value={password}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name={'confirmPassword'}
          value={confirmPassword}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
