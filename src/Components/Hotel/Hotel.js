import "./Hotel.scss";
import SwiftSlider from "react-swift-slider";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// images
import location from "../../assets/imgs/location.svg";
import del from "../../assets/imgs/delete.svg";
import { toast } from "react-toastify";

const Hotel = ({
  restaurant,
  i,
  id,
  city,
  name,
  media,
  date,
  inform_uz,
  inform_en,
  inform_ru,
  karta,
  reyting,
  users,
  site,
  tell,
}) => {
  const [token, setToken] = useAuth(true);

  const d = new Date(date);

  const imgs = [{ id: 1, src: "https://picsum.photos/100" }];
  // const imgs = media.map((item, i) => ({ id: i, src: item.split("__")[2] }));

  const hoteldelete = async () => {
    try {
      if (restaurant === 7) {
        const json = await fetch(`${port.url}/api/admin`, {
          method: "DELETE",
          headers: { "Content-Type": "Application/json", token },
          body: JSON.stringify({ restaurantId: id }),
        });
        const { message, data } = await json.json();

        if (data) {
          toast.success(message);
          window.location = "/restaurants";
        } else {
          if (message === port.errorToken) {
            setToken(false);
          }
          toast.error(message);
        }
      } else {
        const json = await fetch(`${port.url}/api/admin`, {
          method: "DELETE",
          headers: { "Content-Type": "Application/json", token },
          body: JSON.stringify({ hotelId: id }),
        });
        const { message, data } = await json.json();

        if (data) {
          toast.success(message);
          window.location = "/hotels";
        } else {
          if (message === port.errorToken) {
            setToken(false);
          }
          toast.error(message);
        }
      }
    } catch ({ message }) {
      toast.error(message);
    }
  };

  return (
    <tr className="tr">
      <td>{i + 1}</td>
      <td width={220}>
        <SwiftSlider
          data={imgs}
          height={130}
          showDots={false}
          interval={2000}
        />
      </td>
      <td className="hotel-name">{name}</td>
      <td><p className="hotel-inform">{inform_uz}</p></td>
      <td>{city}</td>
      <td>
        {site ? (
          <a href={site} target="_blank" rel="noreferrer">
            Link
          </a>
        ) : (
          <p>NO</p>
        )}
      </td>
      <td>
        {tell.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </td>
      <td>
        {`${d.getDate()}.${
          d.getMonth() + 1
        }.${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}`}
      </td>
      <td>{`${reyting} (${reyting && users})`}</td>
      <td>
        <a href={karta} target="_blank" rel="noreferrer">
          <img src={location} width={20} alt="location" />
        </a>
      </td>
      <td>
        <img
          src={del}
          alt="img"
          className="hotel__delete"
          onClick={hoteldelete}
        />
      </td>
    </tr>
  );
};

export default Hotel;
