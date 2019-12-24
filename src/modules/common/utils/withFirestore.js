import React from 'react';
import { useStore } from 'react-redux';

// Create HOC that gets firestore from react context and passes it as a prop
// NOTE: Modified version of withFirestore for a simple example. For a full
// application, use react-redux-firebase's withFirestore: https://goo.gl/4pxmPv
export const withFirestore = WrappedComponent =>
  function WithFirestoreComponent(props) {
    const store = useStore();

    return (
      <WrappedComponent
        {...props}
        dispatch={store.dispatch}
        firestore={store.firestore}
      />
    );
  };
