import { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { EMAIL_REGEX } from "../../regex/email";
import { PWD_REGEX } from "../../regex/pass";
import AuthProvider from "../../context/AuthProvider.tsx";
import { CircularProgress } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Log.css";
import useAuth from "../../hooks/useAuth.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const LOGIN_URL = "/api/v1/authentication/login";

export default function Login({
  setisUser,
}: {
  setisUser: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  const home = location.state?.home?.pathname || "/";
  const userRef = useRef<HTMLInputElement>(null);
  const errRef: any = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {auth,setAuth}:any = useAuth()

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await axiosPrivate.post(LOGIN_URL, { email, password: pwd });
      const token = await res.data.token;

      setErrMsg("");
      setAuth({ token });

      localStorage.setItem("token", token);
      setisUser(true);
      navigate(home, { replace: true });
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg(err.response.data.message);
        setEmail("");
        setPwd("");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setValidEmail(true);
  }, [email]);

  useEffect(() => {
    setValidPwd(true);
  }, [pwd]);

  return (
    <>
      <div className="container m-auto">
        <div className="im"></div>
        <section className="logn">
          <form className="logn-form" onSubmit={handleSubmit}>
            <h1
              className="text-4xl font-bold btn btn-ghost txt1"
              title="Sign Up"
            >
              Log In
            </h1>
            <label htmlFor="email" className="logn-label">
              Email{" "}
            </label>
            <input
              placeholder="E-Mail"
              type="text"
              id="email"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(true)}
              value={email}
              className="logn-input"
              key={"email"}
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
              email must be like this: example@gmail.com
            </p>

            <label htmlFor="password" className="logn-label">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              value={pwd}
              className="logn-input"
              key={"pwd"}
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

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>

            <button
              className="logn-button"
              disabled={isLoading || !pwd || !email}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </button>
            <p>
              Don't have an account?
              <span className="log">
                <Link to="/register" id="sign-link" className="log">
                  Sign up
                </Link>
                <br />
              </span>
            </p>
          </form>
        </section>
      </div>
    </>
  );
}
