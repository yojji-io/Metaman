/* eslint-disable */
/* prettier-ignore */
import React from "react";

import { AuthContext } from "../context";
import { useProvideAuth } from "../hooks";

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
