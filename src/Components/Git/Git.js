import "./Git.scss";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// images
import del from "../../assets/imgs/delete.svg";

const Git = ({
  i,
  id,
  date,
  image,
  inform_uz,
  inform_en,
  inform_ru,
  languages,
  price,
  tell,
  username,
  reyting,
  users,
}) => {
  const [token, setToken] = useAuth(true);

  const [modal, setModal] = useState(false);

  const refModalExit = useRef();

  const d = new Date(date);

  const gitdelete = async () => {
    try {
      const json = await fetch(`${port.url}/api/admin`, {
        method: "DELETE",
        headers: { "Content-Type": "Application/json", token },
        body: JSON.stringify({ gitId: id }),
      });
      const { message, data } = await json.json();

      if (data) {
        toast.success(message);
        window.location = "/gits";
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

  const modalExit = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target === refModalExit.current
    ) {
      setModal(false);
    }
  };

  return (
    <div>
      <tr className="tr">
        <td>{i + 1}</td>
        <td>
          <img className="git__image" src={image} alt={username} />
        </td>
        <td>{username}</td>
        <td onClick={(event) => console.log("hello")}>{inform_uz}</td>
        <td>{`${reyting} (${reyting && users})`}</td>
        <td>{`${d.getDate()}.${
          d.getMonth() + 1
        }.${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}`}</td>
        <td>
          {languages.map((language, i) => (
            <p key={i}>{language}</p>
          ))}
        </td>
        <td>
          {tell.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </td>
        <td>{`$${price}`}</td>

        <td>
          <img
            src={del}
            alt="img"
            className="git__delete"
            onClick={gitdelete}
          />
        </td>
      </tr>
    </div>
  );
};

export default Git;
