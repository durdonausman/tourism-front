import "./App.scss";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//    Routes
import { Private } from "./Rotutes/Private";
import { Public } from "./Rotutes/Public";
//    Pages
import { Admin } from "./Pages/Admin/Admin";
import { Login } from "./Pages/Login/Login";

//    Components

export function App() {
  return (
    <>
      <Switch>
        <Public path="/login" component={Login} />
        <Private path="/" component={Admin} />
      </Switch>

      <ToastContainer />
    </>
  );
}
