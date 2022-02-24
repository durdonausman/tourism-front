import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../Hooks/useAuth";
export function Private(props) {
  const [token] = useAuth(true);
  if (token) return <Route {...props} />;
  return <Redirect to="/login" />;
}
