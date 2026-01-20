import style from "@styles/Login.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  const [UsernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const AddMessage = (msg) => setErrorMessage(msg);

  const removeMessage = () => setErrorMessage("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setError(false);

    if (!username.trim()) {
      AddMessage("All fields are required");
      setUsernameError(true);
      setError(true);
    }

    if (!password.trim()) {
      AddMessage("All fields are required");
      setPasswordError(true);
      setError(true);
    }

    if (!username.trim() || !password.trim()) return;

    if (password.trim() && username.trim()) {
      removeMessage();
    }

    if (error) {
      setError(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      const isAuth = !!localStorage.getItem("token");

      if (!isAuth) {
        navigate("/login");
      }

      if (!res.ok) {
        AddMessage("Invalid Credentials");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/home");
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <>
      <section className={style.Login}>
        <div className={style.LoginContainer}>
          <div className={style.img}>
            <Icon
              width={24}
              height={24}
              icon={"material-symbols:login-rounded"}
              color="#000000"
            />
          </div>
          <h3>Sign in with username</h3>
          <form onSubmit={(e) => handleSubmit(e)} noValidate method="post">
            <div
              className={`${style.Box} ${UsernameError ? style.Danger : ""}`}
            >
              <input
                type="text"
                id="Username"
                placeholder=" "
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(false);
                  removeMessage();
                }}
              />
              <label htmlFor="Username">
                <Icon
                  width={18}
                  height={18}
                  icon={"tabler:mail-filled"}
                  color="#848b96"
                />
                <span>Username</span>
              </label>
            </div>
            <div
              className={`${style.Box} ${passwordError ? style.Danger : ""}`}
            >
              <input
                type="password"
                id="password"
                placeholder=" "
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                  removeMessage();
                }}
              />
              <label htmlFor="password">
                <Icon
                  width={18}
                  height={18}
                  icon={"tabler:lock-filled"}
                  color="#848b96"
                />
                <span>Password</span>
              </label>
            </div>
            {/* <a className={style.forgot} href="/forgot">
              forgot password ?
            </a> */}
            <div className={style.buttonWrapper}>
              <button type="submit">Login</button>
            </div>
            <div className={style.signUp}>
              new ? <a href="/signup">Sign Up here</a>
            </div>
            <div className={style.messageBox}>&nbsp;{errorMessage}</div>
          </form>
        </div>
      </section>
    </>
  );
};
