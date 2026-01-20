import { Icon } from "@iconify/react";
import style from "@styles/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const AddMessage = (msg) => setErrorMessage(msg);
  const removeMessage = () => setErrorMessage("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(false);

    if (!email.includes("@")) {
      AddMessage("please enter a valid Email");
      setEmailError(true);
      setError(true);
    }

    if (!username.trim()) {
      AddMessage("All fields are required");
      setUsernameError(true);
      setError(true);
    }

    if (!email.trim()) {
      AddMessage("All fields are required");
      setEmailError(true);
      setError(true);
    }

    if (!mobile.trim()) {
      AddMessage("All fields are required");
      setMobileError(true);
      setError(true);
    }

    if (!password.trim()) {
      AddMessage("All fields are required");
      setPasswordError(true);
      setError(true);
    }

    if (!confirmPassword.trim()) {
      AddMessage("All fields are required");
      setConfirmPasswordError(true);
      setError(true);
    }

    if (password !== confirmPassword) {
      AddMessage("Passwords do not match");
      setConfirmPasswordError(true);
      setPasswordError(true);
      setError(true);
    }

    if (
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !email.trim() ||
      !mobile.trim()
    )
      return;

    if (password.trim() && username.trim() && password === confirmPassword) {
      removeMessage();
    }

    if (error) {
      setError(false);
      return;
    }

    try {
      fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          mobile,
          password,
          confirmPassword,
        }),
      })
        .then((res) => res.json())
        .then((dat) => {
          if (dat.success) {
            navigate("/home");
          }
          if (dat.message) {
            AddMessage(dat.message);
          }
        });
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
          <h3>Sign up</h3>
          <form onSubmit={(e) => handleSignup(e)} noValidate method="post">
            {/* Username */}
            <div
              className={`${style.Box} ${usernameError ? style.Danger : ""}`}
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
                  icon={"tdesign:user-1-filled"}
                  color="#848b96"
                />
                <span>Username</span>
              </label>
            </div>
            {/* Gmail */}
            <div className={`${style.Box} ${emailError ? style.Danger : ""}`}>
              <input
                type="text"
                id="email"
                placeholder=" "
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                  removeMessage();
                }}
              />
              <label htmlFor="email">
                <Icon
                  width={18}
                  height={18}
                  icon={"material-symbols:stacked-email-rounded"}
                  color="#848b96"
                />
                <span>Email</span>
              </label>
            </div>
            {/* Mobile Number */}
            <div className={`${style.Box} ${mobileError ? style.Danger : ""}`}>
              <input
                type="text"
                id="email"
                placeholder=" "
                required
                onChange={(e) => {
                  setMobile(e.target.value);
                  setMobileError(false);
                  removeMessage();
                }}
              />
              <label htmlFor="email">
                <Icon
                  width={18}
                  height={18}
                  icon={"material-symbols:phone-enabled-sharp"}
                  color="#848b96"
                />
                <span>Mobile No.</span>
              </label>
            </div>
            {/* Password */}
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
                  icon={"material-symbols:lock-open"}
                  color="#848b96"
                />
                <span>Password</span>
              </label>
            </div>
            {/* Confirm Password */}
            <div
              className={`${style.Box} ${confirmPasswordError ? style.Danger : ""}`}
            >
              <input
                type="password"
                id="ConfirmPassword"
                placeholder=" "
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError(false);
                  removeMessage();
                }}
              />
              <label htmlFor="password">
                <Icon
                  width={18}
                  height={18}
                  icon={"material-symbols:lock"}
                  color="#848b96"
                />
                <span>Confirm Password</span>
              </label>
            </div>
            {/* Submit */}
            <div className={style.buttonWrapper}>
              <button type="submit">Get Started...</button>
            </div>
            <div className={style.signUp}>
              Aldreay a user ? <a href="/">Login</a>
            </div>
            {/* <div className={style.messageBox}>Username can contain only letters, numbers, _</div> */}
            <div className={style.messageBox}>&nbsp;{errorMessage}</div>
          </form>
        </div>
      </section>
    </>
  );
};
