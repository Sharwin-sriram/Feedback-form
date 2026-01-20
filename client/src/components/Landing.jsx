import style from "@styles/Landing.module.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
const url = "http://localhost:5001/api";

export default () => {
  const [dataExists, setDataExist] = useState(true);
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);

  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((dat) => {
        if (dat.length === 0) setDataExist(false);
        setData(dat);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (_id) => {
    fetch(`${url}/${_id}`, {
      method: "DELETE",
    }).then(() => setData((prev) => prev.filter((item) => item._id !== _id)));
  };

  const feedbacks = data.map((dat, index) => {
    const { _id, name, feedback } = dat;
    const isOpen = openId === _id;
    return (
      <div
        key={_id}
        className={`${style.Wrapper}`}
        onClick={() => setOpenId(isOpen ? null : _id)}
      >
        <div className={style.feedback}>
          <div className={style.name}>
            <span>Name: </span>
            {name}
          </div>
          <div
            className={`${style.feedbackContent} ${isOpen ? style.Open : style.Closed}`}
          >
            <span>Feedback: </span>
            {feedback}
          </div>
        </div>
        <div className={style.downArrow}>
          <Icon
            icon={"material-symbols:keyboard-arrow-down-rounded"}
            width={24}
            height={24}
          />
        </div>
        <button
          className={`${style.delete} ${isOpen ? style.DeleteBtnOn : ""}`}
          onClick={() => handleDelete(openId)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <section className={style.landing}>
      <div className={style.feedbackWrapper}>
        {dataExists ? feedbacks : "No feedbacks yet..."}
      </div>
    </section>
  );
};
