import style from "@styles/Header.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import NewFeedback from "@ui/newFeedback";

export default () => {
  const size = 24;
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className={style.header1}>
        <div className={style.New}>
          <button onClick={() => setOpen(!open)}>
            <Icon width={size} height={size} icon={"material-symbols:add"} />
            New
          </button>
        </div>
        <h1 className={style.title}>Feedbacks</h1>
        <div>
          <NewFeedback open={open} setOpen={setOpen} />
        </div>
      </div>
      <div className={style.header2}></div>
    </header>
  );
};
