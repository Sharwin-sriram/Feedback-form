import Overlay from "@styles/Overlay.module.css";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [nameError, setNameError] = useState(false);
  const [textAreaError, setTextAreaError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const closeOverlay = () => {
    setOpen(!open);
  };

  const createNewFeedback = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("All fields are required");
      setNameError(true);
    }

    if (!feedback.trim()) {
      setErrorMsg("All fields are required");
      setTextAreaError(true);
    }

    if (!name.trim() || !feedback.trim()) return;

    fetch("http://localhost:5001/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, feedback }),
    })
      .then((res) => res.json())
      .then(() => {
        closeOverlay();
      });
  };

  if (!open) return null;

  return (
    <div className={Overlay.NewFeedback}>
      <button className={Overlay.closeBtn} onClick={closeOverlay}>
        <Icon width={32} height={32} icon={"mdi:close"} color="#FFFFFF" />
      </button>
      <form method="post" onSubmit={(e) => createNewFeedback(e)}>
        <h4>Whom do you want to write feedback about</h4>

        <input
          type="text"
          value={name}
          className={`${nameError ? Overlay.Danger : ""}`}
          placeholder="name"
          onChange={(e) => {
            setNameError(false);
            setErrorMsg("");
            setName(e.target.value);
          }}
        />

        <textarea
          value={feedback}
          className={`${textAreaError ? Overlay.Danger : ""}`}
          placeholder="feedback"
          onChange={(e) => {
            setTextAreaError(false);
            setErrorMsg("");
            setFeedback(e.target.value);
          }}
        ></textarea>

        <button type="submit">Create</button>
      </form>
      <div className={Overlay.error}>&nbsp;{errorMsg}</div>
    </div>
  );
};
