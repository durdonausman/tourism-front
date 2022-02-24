import "./Hotels.scss";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

// port
import port from "../../assets/config/config";

// components
import Hotel from "../../Components/Hotel/Hotel";

export function Hotels({ hotelCategories }) {
  const [token] = useAuth(true);

  const [city, setCity] = useState("all");
  const [categoryHotel, setCategoryHotel] = useState("all");
  const [allHotels, setAllHotels] = useState([]);
  const [hotels, setHotels] = useState([]);

  const refSelectCity = useRef();
  const refSelectCategory = useRef();

  function selectClick() {
    setCity(refSelectCity.current.value);

    const filterHotelCity = allHotels.filter(
      (hotel) => hotel.city === refSelectCity.current.value
    );

    const filterHotelCategory = allHotels.filter(
      (hotel) => hotel.category_id === categoryHotel
    );

    const filterHotelCategoryCity = allHotels.filter(
      (hotel) =>
        hotel.category_id === categoryHotel &&
        hotel.city === refSelectCity.current.value
    );

    if (refSelectCity.current.value === "all" && categoryHotel === "all") {
      setHotels(allHotels);
      return;
    } else if (refSelectCity.current.value === "all") {
      setHotels(filterHotelCategory);
      return;
    } else if (categoryHotel === "all") {
      setHotels(filterHotelCity);
      return;
    } else {
      setHotels(filterHotelCategoryCity);
    }
  }

  function selectClickCategory() {
    setCategoryHotel(refSelectCategory.current.value);

    const filterHotelCity = allHotels.filter((hotel) => hotel.city === city);

    const filterHotelCategory = allHotels.filter(
      (hotel) => hotel.category_id === refSelectCategory.current.value
    );

    const filterHotelCategoryCity = allHotels.filter(
      (hotel) =>
        hotel.category_id === refSelectCategory.current.value &&
        hotel.city === city
    );

    if (city === "all" && refSelectCategory.current.value === "all") {
      setHotels(allHotels);
      return;
    } else if (city === "all") {
      setHotels(filterHotelCategory);
      return;
    } else if (refSelectCategory.current.value === "all") {
      setHotels(filterHotelCity);
      return;
    } else {
      setHotels(filterHotelCategoryCity);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(`${port.url}/api/hotel`, {
          headers: { admin: "admin" },
        });

        const { message, data } = await json.json();

        if (data && data.length) {
          setAllHotels(data);
          setHotels(data);
        } else {
          toast.error(message);
        }
      } catch ({ message }) {
        toast.error(message);
      }
    })();
  }, [token]);

  return (
    <div className="hotel">
      <div className="hotel-header">
        <div className="flex__box">
          <h1 className="hotel__heading heading-primary">Hotels</h1>
          <span className="count"> {allHotels.length} </span>
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

        <span className="count">{hotels.length}</span>

        <select
          ref={refSelectCategory}
          defaultValue={categoryHotel}
          onChange={selectClickCategory}
          className="objects-select"
        >
          <option value="all">All</option>

          {hotelCategories.length &&
            hotelCategories.map(({ id, name_uz }) => (
              <option key={id} value={id}>
                {name_uz}
              </option>
            ))}
        </select>
      </div>

      <div className="hotel-list">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>№</th>
              <th>Media</th>
              <th>Name</th>
              <th>Informations</th>
              <th>City</th>
              <th>Web site</th>
              <th>Tell</th>
              <th>Created</th>
              <th>Reyting</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {hotels.length &&
              hotels.map((hotel, i) => (
                <Hotel
                  key={i}
                  i={i}
                  id={hotel.id}
                  city={hotel.city}
                  name={hotel.name}
                  media={hotel.media}
                  date={hotel.date}
                  inform_uz={hotel.inform_uz}
                  inform_en={hotel.inform_en}
                  inform_ru={hotel.inform_ru}
                  karta={hotel.karta}
                  reyting={hotel.reyting}
                  users={hotel.users}
                  site={hotel.site}
                  tell={hotel.tell}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
