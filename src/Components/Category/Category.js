import "./Category.scss";

// image
import del from "../../assets/imgs/delete.svg";

const Category = ({
  i,
  id,
  name_uz,
  name_en,
  name_ru,
  status,
  deleteCategory,
}) => {
  return (
    <tr className="tr">
      <td>{i + 1}</td>
      <td>{name_uz}</td>
      <td>{name_en}</td>
      <td> {name_ru} </td>
      <td>
        <div className="status">
          <div
            className={`status__item ${status && "status__item__click"}`}
          ></div>
        </div>
      </td>

      <td>
        <img
          src={del}
          alt="img"
          className="categories__delete"
          onClick={() => {
            deleteCategory(id);
          }}
        />
      </td>
    </tr>
  );
};

export default Category;

// function statusClick(e) {
//   if (status) {
//     if (e.target.className === "status") {
//       e.target.children[0].classList.add("status__item__click");
//     } else {
//       e.target.classList.add("status__item__click");
//     }
//     setStatus(false);
//   } else {
//     if (e.target.className === "status") {
//       e.target.children[0].classList.remove("status__item__click");
//     } else {
//       e.target.classList.remove("status__item__click");
//     }
//     setStatus(true);
//   }
// }
