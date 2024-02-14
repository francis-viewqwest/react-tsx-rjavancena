import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthContextProps {
  token: string | undefined;
  setToken: (newToken: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  token: undefined,
  setToken: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState(Cookies.get("token"));

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      Cookies.set("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      Cookies.remove("token");
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
