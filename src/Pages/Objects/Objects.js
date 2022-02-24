import "./Objects.scss";
import { useEffect, useRef, useState } from "react";
// Components
import Object from "../../Components/Object/Object";

//Port
import port from "../../assets/config/config";

export function Objects() {
  const [objects, setObjects] = useState([]);
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("all");
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const refSelectCategory = useRef();
  const refSelectCity = useRef();

  useEffect(() => {
    (async () => {
      const json = await fetch(`${port.url}/api/object`, {
        headers: {
          admin: "admin",
          //  city,
          //  category
        },
      });
      const { data } = await json.json();

      if (data) {
        // console.log(data);
        setObjects(data);
        setData(data);
      }
    })();
    (async () => {
      const json = await fetch(`${port.url}/api/objects/categories`, {
        headers: { admin: "admin" },
      });
      const { data } = await json.json();

      if (data) {
        // console.log(data);
        setCategories(data);
      }
    })();
  }, []);

  function selectCategory() {
    if (refSelectCity.current.value === "all") {
      if (refSelectCategory.current.value === "all") return setData(objects);
      setData(
        objects.filter((o) => o.category_id === refSelectCategory.current.value)
      );
    } else {
      if (refSelectCategory.current.value === "all")
        return setData(
          objects.filter((o) => o.ciy === refSelectCity.current.value)
        );
      setData(
        objects.filter(
          (o) =>
            o.category_id === refSelectCategory.current.value &&
            o.city === refSelectCity.current.value
        )
      );
    }
  }
  function selectCity() {
    if (refSelectCategory.current.value === "all") {
      if (refSelectCity.current.value === "all") return setData(objects);
      setData(objects.filter((o) => o.city === refSelectCity.current.value));
    } else {
      if (refSelectCity.current.value === "all")
        return setData(
          objects.filter(
            (o) => o.category_id === refSelectCategory.current.value
          )
        );
      setData(
        objects.filter(
          (o) =>
            o.city === refSelectCity.current.value &&
            o.category_id === refSelectCategory.current.value
        )
      );
    }
  }
  
  return (
    <div className="objects">
      <div className="objects-header">
        <h1 className="objects__heading heading-primary">Objects</h1>

        <button className="objects__add">Add Object</button>
      </div>
      <div className="filter">
        <h3>Categories</h3>
        <select
          ref={refSelectCategory}
          onChange={selectCategory}
          className="objects-category-select select"
          defaultValue={category}
        >
          <h3>Viloyatlar</h3>
          <option value="all">All</option>
          {categories &&
            categories.map(({ id, name_uz }, i) => (
              <option key={i} value={id}>
                {name_uz}
              </option>
            ))}
        </select>
        <select
          ref={refSelectCity}
          defaultValue={city}
          onChange={selectCity}
          className="objects-city-select select"
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
      <div className="objects-list">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>№</th>
              <th width={250}>Images</th>
              <th>Name Uz</th>
              <th>Name En</th>
              <th>Name Ru </th>
              <th>Info </th>
              {/* <th>Info En</th>
              <th>Info Ru </th> */}
              <th>Phone number</th>
              <th>Location</th>
              {/* <th>Web page</th> */}
              {/* <th>Season</th> */}
              <th>Status</th>
              {/* <th></th> */}
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody className="table-body">
            {data.length &&
              data.map(
                (
                  {
                    id,
                    inform_en,
                    inform_uz,
                    inform_ru,
                    reyting,
                    name_uz,
                    name_ru,
                    name_en,
                    media,
                    tell,
                    karta,
                  },
                  i
                ) => (
                  <Object
                    key={i}
                    i={i}
                    id={id}
                    name_uz={name_uz}
                    name_en={name_en}
                    name_ru={name_ru}
                    inform_en={inform_en}
                    inform_ru={inform_ru}
                    inform_uz={inform_uz}
                    reyting={reyting}
                    media={media}
                    tell={tell}
                    karta={karta}
                  />
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
