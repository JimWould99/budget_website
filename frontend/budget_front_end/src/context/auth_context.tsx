import { createContext, useEffect, useState, ReactNode } from "react";

type User = {
  email: string;
  token: string;
};

type AuthContextProps = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  function login(user: User) {
    setUser(user);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
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
