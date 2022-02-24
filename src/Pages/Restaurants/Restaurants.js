import "./Restaurants.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// components
import Hotel from "../../Components/Hotel/Hotel";

export function Restaurants({ resCategories }) {
  const [token] = useAuth(true);

  const [city, setCity] = useState("all");
  const [categoryRestaurant, setCategoryRestaurant] = useState("all");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const refSelectCity = useRef();
  const refSelectCategory = useRef();

  function selectClick() {
    setCity(refSelectCity.current.value);

    const filterRestaurantCity = allRestaurants.filter(
      (restaurant) => restaurant.city === refSelectCity.current.value
    );

    const filterRestaurantCategory = allRestaurants.filter(
      (restaurant) => restaurant.category_id === categoryRestaurant
    );

    const filterRestaurantCategoryCity = allRestaurants.filter(
      (restaurant) =>
        restaurant.category_id === categoryRestaurant &&
        restaurant.city === refSelectCity.current.value
    );

    if (refSelectCity.current.value === "all" && categoryRestaurant === "all") {
      setRestaurants(allRestaurants);
      return;
    } else if (refSelectCity.current.value === "all") {
      setRestaurants(filterRestaurantCategory);
      return;
    } else if (categoryRestaurant === "all") {
      setRestaurants(filterRestaurantCity);
      return;
    } else {
      setRestaurants(filterRestaurantCategoryCity);
    }
  }

  function selectClickCategory() {
    setCategoryRestaurant(refSelectCategory.current.value);

    const filterRestaurantCity = allRestaurants.filter(
      (restaurant) => restaurant.city === city
    );

    const filterRestaurantCategory = allRestaurants.filter(
      (restaurant) => restaurant.category_id === refSelectCategory.current.value
    );

    const filterRestaurantCategoryCity = allRestaurants.filter(
      (restaurant) =>
        restaurant.category_id === refSelectCategory.current.value &&
        restaurant.city === city
    );

    if (city === "all" && refSelectCategory.current.value === "all") {
      setRestaurants(allRestaurants);
      return;
    } else if (city === "all") {
      setRestaurants(filterRestaurantCategory);
      return;
    } else if (refSelectCategory.current.value === "all") {
      setRestaurants(filterRestaurantCity);
      return;
    } else {
      setRestaurants(filterRestaurantCategoryCity);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(`${port.url}/api/restaurant`, {
          headers: { admin: "admin" },
        });

        const { message, data } = await json.json();

        if (data && data.length) {
          setAllRestaurants(data);
          setRestaurants(data);
        } else {
          toast.error(message);
        }
      } catch ({ message }) {
        toast.error(message);
      }
    })();
  }, [token]);

  return (
    <div className="restaurant">
      <div className="restaurant-header">
        <div className="flex__box">
          <h1 className="restaurant__heading heading-primary">Resturants</h1>
          <span className="count"> {allRestaurants.length} </span>
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

        <span className="count">{restaurants.length}</span>

        <select
          ref={refSelectCategory}
          defaultValue={categoryRestaurant}
          onChange={selectClickCategory}
          className="objects-select"
        >
          <option value="all">All</option>

          {resCategories.length &&
            resCategories.map(({ id, name_uz }) => (
              <option key={id} value={id}>
                {name_uz}
              </option>
            ))}
        </select>
      </div>

      <div className="restaurant-list">
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
            {restaurants.length &&
              restaurants.map((restaurant, i) => (
                <Hotel
                  restaurant={7}
                  key={i}
                  i={i}
                  id={restaurant.id}
                  city={restaurant.city}
                  name={restaurant.name}
                  media={restaurant.media}
                  date={restaurant.date}
                  inform_uz={restaurant.inform_uz}
                  inform_en={restaurant.inform_en}
                  inform_ru={restaurant.inform_ru}
                  karta={restaurant.karta}
                  reyting={restaurant.reyting}
                  users={restaurant.users}
                  site={restaurant.site}
                  tell={restaurant.tell}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
