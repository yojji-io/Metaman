/* eslint-disable */
/* prettier-ignore */
import * as firebase from 'firebase/app';
import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../context';
import { FIREBASE_AUTH_TYPES } from "../../core/constants";

export const useAuth = () => {
  return useContext(AuthContext);
};

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false);
  
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const getAuthProviderByName = name => {
    let provider;
    switch(name) {
      case FIREBASE_AUTH_TYPES.GOOGLE: {
        provider = new firebase.auth.GoogleAuthProvider();
        break
      }
      case FIREBASE_AUTH_TYPES.GIT: {
        provider = new firebase.auth.GithubAuthProvider();
        break
      }

      default:
        throw new Error(`Can not process login via ${name}`)
    }

    return provider;
  };

  const oauth = async (providerName, confirmUseExistProvider) => {
    const provider = getAuthProviderByName(providerName);

    return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => firebase.auth().signInWithPopup(provider))
      .then(result => setUser(result))
      .catch(async error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          await handleAccountRepeatedCredentialsErr(error, confirmUseExistProvider);
          return;
        }
        throw error
      })
  };

  const handleAccountRepeatedCredentialsErr = async (error, confirmUseExistProvider) => {
    const { email } = error;
    const methods = await firebase.auth().fetchSignInMethodsForEmail(email);

    if (methods[0] === 'password') {
      throw new Error('Account exists with different credential. Please use simple email/password login for ' + email);
    }

    const providerName = methods[0];
    confirmUseExistProvider(providerName);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setFetched(true);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Return the user object and auth methods
  return {
    user,
    oauth,
    signin,
    signup,
    signout,
    fetched,
    confirmPasswordReset,
    sendPasswordResetEmail,
  };

}
