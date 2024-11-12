import { createContext, useEffect, useState, ReactNode } from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContext = {
  user: object | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<object | null>(null);

  function login(token: string) {
    setUser(token);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      login(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
