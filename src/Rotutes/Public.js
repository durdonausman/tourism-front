import { Redirect, Route } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
export function Public(props) {
  const [token] = useAuth(true);
  if (token) return <Redirect to="/admin" />;
  return <Route {...props} />;
}
