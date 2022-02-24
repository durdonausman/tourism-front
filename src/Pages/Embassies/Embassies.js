import "./Embassies.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

// port
import port from "../../assets/config/config";

// components
import Embassy from "../../Components/Embassy/Embassy";

export function Embassies() {
  const [token, setToken] = useAuth(true);

  const [modalStatus, setModalStatus] = useState(false);
  const [modalStatusEdit, setModalStatusEdit] = useState(false);
  const [editEmbassyValues, setEditEmbassyValues] = useState({
    id: "",
    name: "",
    tell: [],
    karta: "",
  });
  const [embassies, setEmbassies] = useState([]);

  // post
  const refModalExit = useRef();
  const refName = useRef();
  const refKarta = useRef();
  const refMedias = useRef();
  const refTell1 = useRef();
  const refTell2 = useRef();
  const refTell3 = useRef();
  // put
  const refModalExitEdit = useRef();
  const refNameEdit = useRef();
  const refKartaEdit = useRef();
  const refMediasEdit = useRef();
  const refTell1Edit = useRef();
  const refTell2Edit = useRef();
  const refTell3Edit = useRef();

  useEffect(() => {
    (async () => {
      const json = await fetch(`${port.url}/api/embassy`);
      const { data } = await json.json();

      if (data) {
        setEmbassies(data);
      }
    })();
  }, []);

  const addEmbassy = async (evt) => {
    evt.preventDefault();

    if (!refMedias.current.files.length) {
      toast.error("IMAGE va VIDEO kirgazish kerak!");
      return;
    } else if (refMedias.current.files.length > 4) {
      toast.error("IMAGE va VIDEO lar soni 4 tadan ko'p bo'lmasligi kerak!");
      return;
    }

    const formdata = new FormData();

    formdata.append("name", refName.current.value);
    formdata.append("karta", refKarta.current.value);
    formdata.append("tell", refTell1.current.value);
    if (refTell2.current.value) {
      formdata.append("tell", refTell2.current.value);
    }
    if (refTell3.current.value) {
      formdata.append("tell", refTell3.current.value);
    }

    for (let i = 0; i < refMedias.current.files.length; i++) {
      if (refMedias.current.files[i].name) {
        if (refMedias.current.files[i].type) {
          if (
            refMedias.current.files[i].type.split("/")[0] === "image" ||
            refMedias.current.files[i].type.split("/")[0] === "video"
          ) {
            formdata.append("media", refMedias.current.files[i]);
          }
        }
      }
    }

    const json = await fetch(`${port.url}/api/embassy`, {
      method: "POST",
      headers: { token },
      body: formdata,
    });
    const { message, data } = await json.json();

    if (data) {
      setEmbassies((prev) => [...prev, data]);

      toast.success(message);
    }
    if (message === port.errorToken) {
      setToken(false);
    }

    setModalStatus(false);

    refName.current.value = "";
    refKarta.current.value = "";
    refTell1.current.value = "";
    refTell2.current.value = "";
    refTell3.current.value = "";
  };

  const editEmbassy = async (evt) => {
    evt.preventDefault();

    if (refMediasEdit.current.files.length > 4) {
      toast.error("IMAGE va VIDEO lar soni 4 tadan ko'p bo'lmasligi kerak!");
      return;
    } else if (refMediasEdit.current.files.length) {
      const formdata = new FormData();

      for (let i = 0; i < refMediasEdit.current.files.length; i++) {
        if (refMediasEdit.current.files[i].name) {
          if (refMediasEdit.current.files[i].type) {
            if (
              refMediasEdit.current.files[i].type.split("/")[0] === "image" ||
              refMediasEdit.current.files[i].type.split("/")[0] === "video"
            ) {
              formdata.append("media", refMediasEdit.current.files[i]);
            }
          }
        }
      }

      const json = await fetch(
        `${port.url}/api/embassy/${editEmbassyValues.id}`,
        {
          method: "PUT",
          headers: { token },
          body: formdata,
        }
      );
      const { message, data } = await json.json();

      if (data) {
        // setEmbassies((prev) => [...prev, data]);

        toast.success(message);

        window.location = "/embassies";
      }
      if (message === port.errorToken) {
        setToken(false);
      }
    }

    let tell = [];

    tell.push(refTell1Edit.current.value);

    if (refTell2Edit.current.value) {
      tell.push(refTell2Edit.current.value);
    }
    if (refTell3Edit.current.value) {
      tell.push(refTell3Edit.current.value);
    }

    const info = {
      name: refNameEdit.current.value,
      karta: refKartaEdit.current.value,
      embassyId: editEmbassyValues.id,
      tell,
    };

    const json = await fetch(`${port.url}/api/embassy`, {
      method: "PUT",
      headers: { "Content-Type": "Application/json", token },
      body: JSON.stringify(info),
    });
    const { message, data } = await json.json();

    if (data) {
      // setEmbassies((prev) => [...prev, data]);

      toast.success(message);

      window.location = "/embassies";
    }
    if (message === port.errorToken) {
      setToken(false);
    }

    setModalStatusEdit(false);
    setEditEmbassyValues({
      id: "",
      name: "",
      tell: [],
      karta: "",
    });

    refNameEdit.current.value = "";
    refKartaEdit.current.value = "";
    refTell1Edit.current.value = "";
    refTell2Edit.current.value = "";
    refTell3Edit.current.value = "";
  };

  const modalExit = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target === refModalExit.current ||
      evt.target === refModalExitEdit.current
    ) {
      setModalStatus(false);
      setModalStatusEdit(false);
    }
  };

  return (
    <div className="embassies">
      <div className="embassies-header">
        <h1 className="embassies__heading heading-primary">Embassies</h1>
        <button
          className="embassies__add"
          onClick={() => {
            setModalStatus(true);
          }}
        >
          Add Embassay
        </button>
      </div>

      <div className="embassies-list">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>№</th>
              <th width={250}>Images</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Location</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {embassies.length &&
              embassies.map(({ id, name, media, tell, karta }, i) => (
                <Embassy
                  key={i}
                  i={i}
                  id={id}
                  name={name}
                  media={media}
                  tell={tell}
                  karta={karta}
                  setModalStatusEdit={setModalStatusEdit}
                  setEditEmbassyValues={setEditEmbassyValues}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* add embassy */}
      <div
        className={`modal ${modalStatus && "modal--active"}`}
        onClick={modalExit}
      >
        <div className="modal__body">
          <h1 className="title">Embassay qo'shish</h1>

          <form className="form" onSubmit={addEmbassy}>
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
      </div>

      {/* edit embassy */}
      <div
        className={`modal ${modalStatusEdit && "modal--active"}`}
        onClick={modalExit}
      >
        <div className="modal__body">
          <h1 className="title">Embassay qo'shish</h1>

          <form className="form" onSubmit={editEmbassy}>
            <input
              ref={refNameEdit}
              className="input"
              type="text"
              placeholder="name"
              required
              defaultValue={editEmbassyValues.name}
            />
            <input
              ref={refKartaEdit}
              className="input"
              type="text"
              placeholder="karta link"
              required
              defaultValue={editEmbassyValues.karta}
            />
            <input
              ref={refTell1Edit}
              className="input"
              type="tel"
              placeholder="tell number"
              required
              defaultValue={editEmbassyValues.tell[0]}
            />
            <input
              ref={refTell2Edit}
              className="input"
              type="tel"
              placeholder="tell number ixtiyoriy"
              defaultValue={
                editEmbassyValues.tell[1] && editEmbassyValues.tell[1]
              }
            />
            <input
              ref={refTell3Edit}
              className="input"
              type="tel"
              placeholder="tell number ixtiyoriy"
              defaultValue={
                editEmbassyValues.tell[2] && editEmbassyValues.tell[2]
              }
            />

            <label className="label">
              <input
                ref={refMediasEdit}
                className="file"
                type="file"
                multiple
              />
              image va video max size 5 mg, max file 4 ta, ixtiyoriy
            </label>

            <button className="btn" type="submit">
              Submit
            </button>
          </form>

          <button ref={refModalExitEdit} className="btn__exit">
            X
          </button>
        </div>
      </div>
    </div>
  );
}
