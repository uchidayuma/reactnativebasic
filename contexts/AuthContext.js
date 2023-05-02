import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isPremium: false,
  setIsPremium: () => {},
});

export default AuthContext;