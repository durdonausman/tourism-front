import { createContext, useEffect, useState } from "react";
const Auth = createContext();

function Provider({ children }) {
  const [token, setToken] = useState(window.sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) return window.sessionStorage.setItem("token", token);

    window.sessionStorage.removeItem("token");
  }, [token]);

  return <Auth.Provider value={{ token, setToken }}>{children}</Auth.Provider>;
}
export { Auth, Provider };
