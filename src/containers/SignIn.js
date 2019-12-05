import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';
import firebaseApp from '../components/firebase/Firebase';

// Check https://firebaseopensource.com/projects/firebase/firebaseui-web#handling-anonymous-user-upgrade-merge-conflicts
// if error code firebaseui/anonymous-upgrade-merge-conflict

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. 
  // Alternatively you can provide a callbacks.signInSuccessWithAuthResult function.
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: "password",
      requireDisplayName: false
    }
  ],
  credentialHelper: 'none'
};

export default function SignIn(props) {
  const configuration = {
    ...uiConfig
  };

  if(props.signInSuccessWithAuthResult){
    configuration.signInSuccessWithAuthResult = props.signInSuccessWithAuthResult || function(authResult, redirectUrl) {
      // If a user signed in with email link, ?showPromo=1234 can be obtained from
      // window.location.href.
      // ...
      return false;
    };
  }

  if(props.signInFailure)
    configuration.signInFailure = props.signInFailure

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseApp.auth()} />
    </div>
  );
}