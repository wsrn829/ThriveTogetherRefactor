import React, { createContext, useContext } from "react";
import useToken from "./useToken";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useToken();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
