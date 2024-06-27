import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { USER_REGEX } from "../../regex/user";
import { PWD_REGEX } from "../../regex/pass";
import { EMAIL_REGEX } from "../../regex/email";
import { CircularProgress } from "@mui/material";
import "../../styles/Auth.css";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const REGISTER_URL = "/api/v1/authentication/register";

export default function Register({
  setisUser,
}: {
  setisUser: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef: any = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    setValidConfirmPwd(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, confirmPwd, email]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!validName || !validEmail || !validPwd || !validConfirmPwd) {
      setErrMsg("Invalid Entry");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(REGISTER_URL, {
        fullName: user,
        email,
        password: pwd,
      });

      setErrMsg("");
      navigate("/login", { replace: true });
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container m-auto">
        <section className="sign">
          <h1 className="text-4xl font-bold btn btn-ghost txt1" title="Sign Up">
            Sign Up
          </h1>
          <form className="sign-form" onSubmit={handleSubmit}>
            <label htmlFor="username" className="sign-label">
              UserName{" "}
            </label>
            <input
              placeholder="User Name"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="sign-input"
            ></input>
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email" className="sign-label">
              Email{" "}
            </label>
            <input
              placeholder="E-Mail"
              type="text"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="sign-input"
            ></input>
            <p
              id="eidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              email must be like this: example@gamil.com
            </p>

            <label htmlFor="password" className="sign-label">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              value={pwd}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="sign-input"
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd" className="sign-label">
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setConfirmPwd(e.target.value)}
              required
              value={confirmPwd}
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
              className="sign-input"
            />
            <p
              id="confirmPwdnote"
              className={
                confirmPwdFocus && !validConfirmPwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>
            <button
              className="sign-button"
              disabled={
                isLoading ||
                !validName ||
                !validEmail ||
                !validPwd ||
                !validConfirmPwd
              }
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p>
            Already have account?
            <span className="log">
              <Link to="/login" id="sign-link" className="log">
                log in
              </Link>
              <br />
            </span>
          </p>
        </section>

        <div className="img"></div>
      </div>
    </>
  );
}
