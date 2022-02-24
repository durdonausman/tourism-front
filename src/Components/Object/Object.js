import "./Object.scss";
//port 
import port from "../../assets/config/config";

// images
import { useState } from "react";
import SwiftSlider from "react-swift-slider";
import location from "../../assets/imgs/location.svg";
import edit from "../../assets/imgs/edit.svg";
import del from "../../assets/imgs/delete.svg";
import closeIcon from "../../assets/imgs/close.svg";
import img1 from "../../assets/imgs/img.jpg";
import img2 from "../../assets/imgs/img1.jpeg";
import useAuth from "../../Hooks/useAuth";
const Object = ({
  i,
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
}) => {
  const [token, setToken] = useAuth(true);
  const imgs = media.map((img, i) => ({ id: i, src: img.split("__")[2] }));

  const [status, setStatus] = useState(true);

  function objectedit() {
    console.log('ok');
  }
  function objectdelete(e) {
    (async()=>{
      const json = await fetch(`${port.url}/api/object/${e.target.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "Application/json",token },
      });
      console.log(await json.json());
      
  
      window.location = "/objects";
    })()
  }
  function statusClick(e) {
    if (status) {
      if (e.target.className === "status") {
        e.target.children[0].classList.add("status__item__click");
      } else {
        e.target.classList.add("status__item__click");
      }
      setStatus(false);
    } else {
      if (e.target.className === "status") {
        e.target.children[0].classList.remove("status__item__click");
      } else {
        e.target.classList.remove("status__item__click");
      }
      setStatus(true);
    }
  }
  function getInfo() {
    document.querySelector(".info-modal").style.cssText = `display:flex;`;
  }
  function closeInfoModal() {
    document.querySelector(".info-modal").style.cssText = `display:none;`;
  }
  return (
    <>
      <tr className="tr" data-set-id={id}>
        <td>{i + 1}</td>
        <td width={250}>
          <SwiftSlider
            data={imgs}
            height={150}
            showDots={false}
            interval={2000}
          />
        </td>
        <td width={100}>
          <div id="scroll-container">
            <div id="scroll-text">{name_uz}</div>
          </div>
        </td>
        <td>
          <div id="scroll-container">
            <div id="scroll-text">{name_en}</div>
          </div>
        </td>
        <td>
          <div id="scroll-container">
            <div id="scroll-text">{name_ru}</div>
          </div>
        </td>
        <td>
          <p onClick={getInfo} style={{ cursor: "pointer" }}>
            Get Info
          </p>
          <div className="info-modal">
            <div className="info-modal__content">
              <img
                src={closeIcon}
                onClick={closeInfoModal}
                className="info-modal__content__img"
                alt="img"
              />
              <p className="info-modal__text">O'zbekcha:{inform_uz}</p>
              <p className="info-modal__text">Inglizcha:{inform_en}</p>
              <p className="info-modal__text">Ruscha:{inform_ru}</p>
            </div>
          </div>
        </td>

        <td>
          <a href={`tel:${tell}`} className="phone__link">
            {tell}
          </a>
        </td>
        <td>
          <a href={`${karta}`} target="_blank" rel="noreferrer">
            <img src={location} width={20} alt="location" />
          </a>
        </td>

        <td>
          <div className="status" onClick={statusClick}>
            <div className="status__item"></div>
          </div>
        </td>
        <td>
          <img
            src={edit}
            alt="img"
            className="object__edit"
            onClick={objectedit}
            onMouseEnter={() => {
              document.querySelector(
                ".object__edit"
              ).style.cssText = `transform: scale(1.5);`;
            }}
            onMouseLeave={() => {
              document.querySelector(
                ".object__edit"
              ).style.cssText = `transform: scale(1);`;
            }}
          />
        </td>
        <td>
          <img
            src={del}
            alt="img"
            id={id}
            className="object__delete"
            onClick={objectdelete}
            onMouseEnter={() => {
              document.querySelector(
                ".object__delete"
              ).style.cssText = `transform: scale(1.5);`;
            }}
            onMouseLeave={() => {
              document.querySelector(
                ".object__delete"
              ).style.cssText = `transform: scale(1);`;
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default Object;
