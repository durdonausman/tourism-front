import "./Login.scss";
import { useRef } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

export function Login() {
  const [setToken] = useAuth();

  const refUsername = useRef();
  const refPassword = useRef();

  const handleLogin = async (evt) => {
    evt.preventDefault();

    const info = {
      username: refUsername.current.value,
      password: refPassword.current.value,
    };

    try {
      const json = await fetch(`${port.url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(info),
      });
      const { message, token } = await json.json();

      if (token) {
        setToken(token);

        toast.success(message);
      } else {
        setToken(false);

        toast.error(message);
      }
    } catch ({ message }) {
      setToken(false);

      toast.error(message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1 className="login__title">Login</h1>

        <form className="form" onSubmit={handleLogin}>
          <input
            ref={refUsername}
            className="input"
            type="text"
            placeholder="username"
            required
          />
          <input
            ref={refPassword}
            className="input"
            type="password"
            placeholder="password"
            required
          />

          <button className="btn" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
