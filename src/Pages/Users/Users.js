import "./Users.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// components
import User from "../../Components/User/User";

export function Users() {
  const [token, setToken] = useAuth(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(`${port.url}/api/admin`, {
          headers: { token },
        });

        const { message, data } = await json.json();

        if (data && data.length) {
          setUsers(data);
        } else {
          setToken(false);
          toast.error(message);
        }
      } catch ({ message }) {
        toast.error(message);
      }
    })();
  }, [token, setToken]);

  return (
    <div className="users">
      <div className="container">
        <h1 className="objects__heading heading-primary">Users</h1>

        {users.length ? (
          <ul className="users__box">
            {users.map(({ id, fullname, email, image, date, status }, i) => (
              <User
                key={i}
                id={id}
                fullname={fullname}
                email={email}
                image={image}
                date={date}
                status={status}
              />
            ))}
          </ul>
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
    </div>
  );
}
