import { createContext, Dispatch, SetStateAction, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  userToken: string | null;
  setUserToken: Dispatch<SetStateAction<string | null>>;
  tmdbSessionId: string | null;
  setTmdbSessionId: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem('token'));
  const [tmdbSessionId, setTmdbSessionId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, tmdbSessionId, setTmdbSessionId }}>
      {children}
    </AuthContext.Provider>
  );
}


