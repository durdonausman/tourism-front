import "./Gits.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// components
import Git from "../../Components/Git/Git";

export function Gits() {
  const [token] = useAuth(true);

  const [city, setCity] = useState("all");
  const [allGits, setAllGits] = useState([]);
  const [gits, setGits] = useState([]);

  const refSelectCity = useRef();

  function selectClick() {
    setCity(refSelectCity.current.value);
    const filterGits = allGits.filter(
      (git) => git.city === refSelectCity.current.value
    );
    if (refSelectCity.current.value === "all") {
      setGits(allGits);
    } else {
      setGits(filterGits);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(`${port.url}/api/git`, {
          headers: { admin: "admin" },
        });

        const { message, data } = await json.json();

        if (data && data.length) {
          setAllGits(data);
          setGits(data);
        } else {
          toast.error(message);
        }
      } catch ({ message }) {
        toast.error(message);
      }
    })();
  }, [token]);

  return (
    <div className="git">
      <div className="git-header">
        <div className="flex__box">
          <h1 className="git__heading heading-primary">Guides</h1>
          <span className="count"> {allGits.length} </span>
        </div>

        <div className="flex__box">
          <span className="count">{gits.length}</span>

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
        </div>
      </div>
      <div className="git-list">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>№</th>
              <th width={150}>Images</th>
              <th>Full Name</th>
              <th>Informations</th>
              <th>Reyting</th>
              <th>Created</th>
              <th>Languages</th>
              <th>Tell</th>
              <th>Price 1 day</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {gits.length &&
              gits.map((git, i) => (
                <Git
                  key={i}
                  i={i}
                  id={git.id}
                  date={git.date}
                  image={git.image}
                  inform_uz={git.inform_uz}
                  inform_en={git.inform_en}
                  inform_ru={git.inform_ru}
                  languages={git.languages}
                  price={git.price}
                  tell={git.tell}
                  username={git.username}
                  reyting={git.reyting}
                  users={git.users}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
