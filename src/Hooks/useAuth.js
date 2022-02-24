import { useContext } from "react";
import { Auth } from "../Context/Auth";
function useAuth(value) {
  const { token, setToken } = useContext(Auth);
  return value ? [token, setToken] : [setToken];
}
export default useAuth;
