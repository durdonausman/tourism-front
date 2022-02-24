import "./Admin.scss";
import { useEffect, useState } from "react";
import { Switch } from "react-router-dom";

// port
import port from "../../assets/config/config";

// components
import Sidebar from "../../Components/SideBar/SideBar";

// pages
import { Private } from "../../Rotutes/Private";
import { Categories } from "../Categories/Categories";
import { Embassies } from "../Embassies/Embassies";
import { Gits } from "../Gits/Gits";
import { Hotels } from "../Hotels/Hotels";
import { Objects } from "../Objects/Objects";
import { Restaurants } from "../Restaurants/Restaurants";
import { Transports } from "../Transports/Transports";
import { Users } from "../Users/Users";

export function Admin() {
  const [objCategories, setObjCategories] = useState([]);
  const [hotelCategories, setHotelCategories] = useState([]);
  const [resCategories, setResCategories] = useState([]);
  const [transportCategories, setTransportCategories] = useState([]);

  useEffect(() => {
    const headers = { admin: "admin" };

    (async () => {
      const jsonObj = await fetch(`${port.url}/api/objects/categories`, {
        headers,
      });
      const dataObj = await jsonObj.json();
      if (dataObj && dataObj.data) {
        setObjCategories(dataObj.data);
      }

      const jsonHotel = await fetch(`${port.url}/api/hotels/categories`, {
        headers,
      });
      const dataHotel = await jsonHotel.json();
      if (dataHotel && dataHotel.data) {
        setHotelCategories(dataHotel.data);
      }

      const jsonRes = await fetch(`${port.url}/api/restaurants/categories`, {
        headers,
      });
      const dataRes = await jsonRes.json();
      if (dataRes && dataRes.data) {
        setResCategories(dataRes.data);
      }

      const jsonTransport = await fetch(
        `${port.url}/api/transports/categories`,
        { headers }
      );
      const dataTransport = await jsonTransport.json();
      if (dataTransport && dataTransport.data) {
        setTransportCategories(dataTransport.data);
      }
    })();
  }, []);

  return (
    <div className="admin-wrapper">
      <Sidebar />

      <Switch>
        <Private path="/embassies" component={Embassies} />
        <Private path="/categories">
          <Categories
            objCategories={objCategories}
            setObjCategories={setObjCategories}
            hotelCategories={hotelCategories}
            setHotelCategories={setHotelCategories}
            resCategories={resCategories}
            setResCategories={setResCategories}
            transportCategories={transportCategories}
            setTransportCategories={setTransportCategories}
          />
        </Private>
        <Private path="/gits" component={Gits} />
        <Private path="/hotels">
          <Hotels hotelCategories={hotelCategories} />
        </Private>
        <Private path="/objects">
          <Objects objCategories={objCategories} />
        </Private>
        <Private path="/restaurants">
          <Restaurants resCategories={resCategories} />
        </Private>
        <Private path="/transports">
          <Transports transportCategories={transportCategories} />
        </Private>
        <Private path="/users" component={Users} />
      </Switch>
    </div>
  );
}
