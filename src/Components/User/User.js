import "./User.scss";
import port from "../../assets/config/config";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const User = ({ id, fullname, email, image, date, status }) => {
  const [token, setToken] = useAuth(true);

  const d = new Date(date);

  const handleDelete = async () => {
    try {
      const json = await fetch(`${port.url}/api/admin`, {
        method: "DELETE",
        headers: { "Content-Type": "Application/json", token },
        body: JSON.stringify({ userId: id }),
      });
      const { message, data } = await json.json();

      if (data) {
        toast.success(message);
        window.location = "/users";
      } else {
        if (message === port.errorToken) {
          setToken(false);
        }
        toast.error(message);
      }
    } catch ({ message }) {
      toast.error(message);
    }
  };
  return (
    <li className="list">
      <img
        className="list__image"
        src={"https://via.placeholder.com/100"}
        alt={fullname}
      />

      <div className="list__info">
        <h3>{fullname}</h3>
        <p>{email ? email : "city"}</p>
        <p>{`${d.getDate()}.${
          d.getMonth() + 1
        }.${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}`}</p>
      </div>

      <div className="status list__status">
        <div
          className={`status__item ${status && "status__item__click"}`}
        ></div>
      </div>

      <button className="btn" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default User;
