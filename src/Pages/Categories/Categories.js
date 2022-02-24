import "./Categories.scss";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// components
import Category from "../../Components/Category/Category";

export function Categories({
  objCategories,
  setObjCategories,
  hotelCategories,
  setHotelCategories,
  resCategories,
  setResCategories,
  transportCategories,
  setTransportCategories,
}) {
  const [token, setToken] = useAuth(true);
  const [modalStatus, setModalStatus] = useState(false);

  const [category, setCategory] = useState("objects");

  const selectCategory = useRef();
  const refModalExit = useRef();
  const refCateUz = useRef();
  const refCateEn = useRef();
  const refCateRu = useRef();

  function selectClick() {
    setCategory(selectCategory.current.value);
  }

  const addCategory = async (evt) => {
    evt.preventDefault();

    const info = {
      categoryNameUz: refCateUz.current.value,
      categoryNameEn: refCateEn.current.value,
      categoryNameRu: refCateRu.current.value,
    };

    const json = await fetch(`${port.url}/api/${category}/categories`, {
      method: "POST",
      headers: { "Content-Type": "Application/json", token },
      body: JSON.stringify(info),
    });
    const { message, data } = await json.json();

    if (data) {
      if (category === "objects") {
        setObjCategories([...objCategories, data]);
      } else if (category === "transports") {
        setTransportCategories([...transportCategories, data]);
      } else if (category === "restaurants") {
        setResCategories([...resCategories, data]);
      } else if (category === "hotels") {
        setHotelCategories([...hotelCategories, data]);
      }

      toast.success(message);
    }
    if (message === port.errorToken) {
      setToken(false);
    }

    setModalStatus(false);

    refCateUz.current.value = "";
    refCateEn.current.value = "";
    refCateRu.current.value = "";
  };

  const deleteCategory = async (id) => {
    const json = await fetch(`${port.url}/api/${category}/categories`, {
      method: "DELETE",
      headers: { "Content-Type": "Application/json", token },
      body: JSON.stringify({ categoryId: id }),
    });
    const { message } = await json.json();

    if (message === port.errorToken) {
      setToken(false);
    }

    window.location = "/categories";
  };

  const modalExit = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target === refModalExit.current
    ) {
      setModalStatus(false);
    }
  };
  return (
    <div className="categories">
      <div className="categories-header">
        <h1 className="categories__heading heading-primary">Categories</h1>
        <select
          ref={selectCategory}
          onChange={selectClick}
          className="categories-select select"
          defaultValue={category}
        >
          <option className="categories-select__option" value="objects">
            Turistik object
          </option>
          <option value="restaurants">Restaurants</option>
          <option value="transports">Transports</option>
          <option value="hotels">Hotels</option>
        </select>

        <button
          className="categories__add"
          onClick={() => {
            setModalStatus(true);
          }}
        >
          Add Category
        </button>
      </div>

      <div className="categories-list">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>№</th>
              <th>Name Uz</th>
              <th>Name En</th>
              <th>Name Ru </th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="table-body">
            {category === "objects" ? (
              objCategories.length &&
              objCategories.map(
                ({ id, name_uz, name_en, name_ru, status, date }, i) => (
                  <Category
                    key={i}
                    i={i}
                    id={id}
                    name_uz={name_uz}
                    name_en={name_en}
                    name_ru={name_ru}
                    status={status}
                    deleteCategory={deleteCategory}
                  />
                )
              )
            ) : category === "restaurants" ? (
              resCategories.length &&
              resCategories.map(
                ({ id, name_uz, name_en, name_ru, status, date }, i) => (
                  <Category
                    key={i}
                    i={i}
                    id={id}
                    name_uz={name_uz}
                    name_en={name_en}
                    name_ru={name_ru}
                    status={status}
                    deleteCategory={deleteCategory}
                  />
                )
              )
            ) : category === "transports" ? (
              transportCategories.length &&
              transportCategories.map(
                ({ id, name_uz, name_en, name_ru, status, date }, i) => (
                  <Category
                    key={i}
                    i={i}
                    id={id}
                    name_uz={name_uz}
                    name_en={name_en}
                    name_ru={name_ru}
                    status={status}
                    deleteCategory={deleteCategory}
                  />
                )
              )
            ) : category === "hotels" ? (
              hotelCategories.length &&
              hotelCategories.map(
                ({ id, name_uz, name_en, name_ru, status, date }, i) => (
                  <Category
                    key={i}
                    i={i}
                    id={id}
                    name_uz={name_uz}
                    name_en={name_en}
                    name_ru={name_ru}
                    status={status}
                    deleteCategory={deleteCategory}
                  />
                )
              )
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className={`modal ${modalStatus && "modal--active"}`}
        onClick={modalExit}
      >
        <div className="modal__body">
          <h1 className="title">{`${category} category`}</h1>

          <form className="form" onSubmit={addCategory}>
            <input
              ref={refCateUz}
              className="input"
              type="text"
              placeholder="name uz"
              required
            />
            <input
              ref={refCateEn}
              className="input"
              type="text"
              placeholder="name en"
              required
            />
            <input
              ref={refCateRu}
              className="input"
              type="text"
              placeholder="name ru"
              required
            />

            <button className="btn" type="submit">
              Submit
            </button>
          </form>

          <button ref={refModalExit} className="btn__exit">
            X
          </button>
        </div>
      </div>
    </div>
  );
}
