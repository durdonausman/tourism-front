import "./Transport.scss";
import SwiftSlider from "react-swift-slider";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
// port
import port from "../../assets/config/config";
// images
import edit from "../../assets/imgs/edit.svg";
import del from "../../assets/imgs/delete.svg";

const Transport = ({
  i,
  id,
  city,
  date,
  inform_uz,
  inform_en,
  inform_ru,
  media,
  name,
  owner,
  price,
  tell,
  reyting,
  users,
}) => {
  const [token, setToken] = useAuth(true);

  const d = new Date(date);

  const imgs = [{ id: 1, src: "https://picsum.photos/100" }];

  const transportdelete = async () => {
    try {
      const json = await fetch(`${port.url}/api/transport/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "Application/json", token },
      });
      const { message, data } = await json.json();

      if (data) {
        toast.success(message);
        window.location = "/transports";
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
    <tr className="tr">
      <td>{i + 1}</td>
      <td width={250}>
        <SwiftSlider
          data={imgs}
          height={150}
          showDots={false}
          interval={2000}
        />
      </td>
      <td>{name}</td>
      <td>{inform_uz}</td>
      <td>
        <p>{owner}</p>
        <p>{`${reyting} (${reyting && users})`}</p>
      </td>
      <td>
        <p>{city}</p>
        <p>{`${d.getDate()}.${
          d.getMonth() + 1
        }.${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}`}</p>
      </td>
      <td>
        {tell.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </td>
      <td>{`$${price}`}</td>
      <td>
        <img
          src={edit}
          alt="edit"
          className="embassies__edit"
          onClick={() => {}}
        />
      </td>
      <td>
        <img
          src={del}
          alt="img"
          className="transport__delete"
          onClick={transportdelete}
        />
      </td>
    </tr>
  );
};

export default Transport;
