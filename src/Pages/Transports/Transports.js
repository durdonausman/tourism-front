import "./Transports.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
// port
import port from "../../assets/config/config";
// components
import Transport from "../../Components/Transport/Transport";

export function Transports({ transportCategories }) {
  const [token] = useAuth(true);

  const [modalStatus, setModalStatus] = useState(false);

  const [city, setCity] = useState("all");
  const [categoryTransport, setCategoryTransport] = useState("all");
  const [allTransports, setAllTransports] = useState([]);
  const [transports, setTransports] = useState([]);

  const refSelectCity = useRef();
  const refSelectCategory = useRef();

  function selectClick() {
    setCity(refSelectCity.current.value);

    const filterTransportCity = allTransports.filter(
      (transport) => transport.city === refSelectCity.current.value
    );

    const filterTransportCategory = allTransports.filter(
      (transport) => transport.category_id === categoryTransport
    );

    const filterTransportCategoryCity = allTransports.filter(
      (transport) =>
        transport.category_id === categoryTransport &&
        transport.city === refSelectCity.current.value
    );

    if (refSelectCity.current.value === "all" && categoryTransport === "all") {
      setTransports(allTransports);
      return;
    } else if (refSelectCity.current.value === "all") {
      setTransports(filterTransportCategory);
      return;
    } else if (categoryTransport === "all") {
      setTransports(filterTransportCity);
      return;
    } else {
      setTransports(filterTransportCategoryCity);
    }
  }

  function selectClickCategory() {
    setCategoryTransport(refSelectCategory.current.value);

    const filterTransportCity = allTransports.filter(
      (transport) => transport.city === city
    );

    const filterTransportCategory = allTransports.filter(
      (transport) => transport.category_id === refSelectCategory.current.value
    );

    const filterTransportCategoryCity = allTransports.filter(
      (transport) =>
        transport.category_id === refSelectCategory.current.value &&
        transport.city === city
    );

    if (city === "all" && refSelectCategory.current.value === "all") {
      setTransports(allTransports);
      return;
    } else if (city === "all") {
      setTransports(filterTransportCategory);
      return;
    } else if (refSelectCategory.current.value === "all") {
      setTransports(filterTransportCity);
      return;
    } else {
      setTransports(filterTransportCategoryCity);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(`${port.url}/api/transport`, {
          headers: { admin: "admin" },
        });

        const { message, data } = await json.json();

        if (data && data.length) {
          setAllTransports(data);
          setTransports(data);
        } else {
          toast.error(message);
        }
      } catch ({ message }) {
        toast.error(message);
      }
    })();
  }, [token]);

  console.log(transports);

  const addTransport = () => {};

  return (
    <div className="transport">
      <div className="transport-header">
        <div className="flex__box">
          <h1 className="transport__heading heading-primary">Transports</h1>
          <span className="count"> {allTransports.length} </span>
        </div>

        <select
          ref={refSelectCity}
          defaultValue={city}
          onChange={selectClick}
          className="objects-select"
        >
          <option value="all">All</option>
          <option value="toshkent">Toshkent</option>
          <option value="samarqand">Samarqand</option>
          <option value="andijon">Andijon</option>
          <option value="buxoro">Buxoro</option>
          <option value="farg'ona">Farg'ona</option>
          <option value="jizzax">Jizzax</option>
          <option value="xorazm">Xorazm</option>
          <option value="namangan">Namangan</option>
          <option value="navoi">Navoi</option>
          <option value="qashqadaryo">Qashqadaryo</option>
          <option value="surxondaryo">Surxondaryo</option>
          <option value="sirdaryo">Sirdaryo</option>
          <option value="qoraqalpog'iston">Qoraqalpog'iston</option>
        </select>

        <span className="count">{transports.length}</span>

        <select
          ref={refSelectCategory}
          defaultValue={categoryTransport}
          onChange={selectClickCategory}
          className="objects-select"
        >
          <option value="all">All</option>

          {transportCategories.length &&
            transportCategories.map(({ id, name_uz }) => (
              <option key={id} value={id}>
                {name_uz}
              </option>
            ))}
        </select>

        <button
          className="transport__add"
          onClick={() => {
            setModalStatus(true);
          }}
        >
          Add Transport
        </button>
      </div>

      <div className="transport-list">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>№</th>
              <th width={150}>Images</th>
              <th>Car name</th>
              <th>Informations</th>
              <th>Owner, Reyting</th>
              <th>City, Created</th>
              <th>Tell</th>
              <th>Price 1 day</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {transports.length &&
              transports.map((transport, i) => (
                <Transport
                  i={i}
                  id={transport.id}
                  city={transport.city}
                  date={transport.date}
                  inform_uz={transport.inform_uz}
                  inform_en={transport.inform_en}
                  inform_ru={transport.inform_ru}
                  media={transport.media}
                  name={transport.name}
                  owner={transport.owner}
                  price={transport.price}
                  tell={transport.tell}
                  reyting={transport.reyting}
                  users={transport.users}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* <div
        className={`modal ${modalStatus && "modal--active"}`}
        onClick={modalExit}
      >
        <div className="modal__body">
          <h1 className="title">Embassay qo'shish</h1>

          <form className="form" onSubmit={addTransport}>
            <input
              ref={refName}
              className="input"
              type="text"
              placeholder="name"
              required
            />
            <input
              ref={refKarta}
              className="input"
              type="text"
              placeholder="karta link"
              required
            />
            <input
              ref={refTell1}
              className="input"
              type="tel"
              placeholder="tell number"
              required
            />
            <input
              ref={refTell2}
              className="input"
              type="tel"
              placeholder="tell number ixtiyoriy"
            />
            <input
              ref={refTell3}
              className="input"
              type="tel"
              placeholder="tell number ixtiyoriy"
            />

            <label className="label">
              <input ref={refMedias} className="file" type="file" multiple />
              image va video max size 5 mg, max file 4 ta
            </label>

            <button className="btn" type="submit">
              Submit
            </button>
          </form>

          <button ref={refModalExit} className="btn__exit" type="button">
            X
          </button>
        </div>
      </div> */}
    </div>
  );
}
