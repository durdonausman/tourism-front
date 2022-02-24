import "./Embassy.scss";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// images
import SwiftSlider from "react-swift-slider";
import location from "../../assets/imgs/location.svg";
import edit from "../../assets/imgs/edit.svg";
import del from "../../assets/imgs/delete.svg";

const Embassy = ({
  i,
  id,
  name,
  media,
  karta,
  tell,
  setModalStatusEdit,
  setEditEmbassyValues,
}) => {
  const [token, setToken] = useAuth(true);

  const imgs = media.map((img, i) => ({ id: i, src: img.split("__")[2] }));

  const embassdelete = async () => {
    try {
      const json = await fetch(`${port.url}/api/embassy/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "Application/json", token },
      });
      const { message, data } = await json.json();

      if (data) {
        toast.success(message);
        window.location = "/embassies";
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
      <td>
        <h3>{name}</h3>
      </td>
      <td>
        {tell.map((item, i) => (
          <a href={`tel:${item}`} className="phone__link">
            <p key={i}>{item}</p>
          </a>
        ))}
      </td>
      <td>
        <a href={karta} target="_blank" rel="noreferrer">
          <img src={location} width={20} alt="location" />
        </a>
      </td>
      <td>
        <img
          src={edit}
          alt="edit"
          className="embassies__edit"
          onClick={() => {
            setModalStatusEdit(true);
            setEditEmbassyValues({ id, name, tell, karta });
          }}
        />
      </td>
      <td>
        <img
          src={del}
          alt="delete"
          className="embassies__delete"
          onClick={embassdelete}
        />
      </td>
    </tr>
  );
};

export default Embassy;
