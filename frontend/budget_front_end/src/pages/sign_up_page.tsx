import { useContext, useState } from "react";
import { AuthContext } from "../context/auth_context";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
const Sign_up_Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [confirm, setConfirm] = useState<string>("");
  const [showPass, setShowPass] = useState<string>("password");
  const [error, setError] = useState<string>("test error");
  const [showError, setShowError] = useState<boolean>(false);

  // const [loading, setLoading] = useState<boolean | null>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const sign_up_request = async () => {
    // setLoading(true);
    const request_details = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL_USER}/users/add_user`,
      request_details
    );
    const json = await response.json();
    console.log("json", json);
    if (!response.ok) {
      console.log(json.error);
      //setLoading(false);
      setError(json.error);
      setShowError(true);
    }
    if (response.ok) {
      console.log("response okay?");
      localStorage.setItem("user", JSON.stringify(json));
      login(json);
      //setLoading(false);
      navigate("/");
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sign_up_request();
  };
  /*const handleButtonSubmit = async () => {
    sign_up_request();
  };*/
  const eyeClick = async () => {
    if (showPass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  };
  return (
    <>
      <Header></Header>
      <div className="sm:h-[70vh] h-[50vh] sm:mt-0 mt-12 w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="border-solid border-2 border-blue-300 px-4 sm:px-14  py-16 lg:py-0 flex flex-col justify-between rounded-xl w-[90vw] h-[60vh] lg:h-[40vh] md:w-[60vw] text-center"
        >
          <div>
            <p className="text-lg text-white">balance text</p>
            <label className="flex w-full gap-4 mt-2 items-center border-solid border-blue-300 border-2 input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="text"
                placeholder="mail@site.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </label>
          </div>
          <div className="flex  justify-between gap-4 items-center">
            <label className="w-full  flex gap-4 border-solid border-blue-300 border-2 items-center input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type={showPass}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full"
              />
            </label>
            {showPass === "password" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:cursor-pointer"
                onClick={() => eyeClick()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
            {showPass === "text" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:cursor-pointer"
                onClick={() => eyeClick()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </div>
          <div>
            <button
              className="btn btn-info btn-sm h-11 mb-2 text-xl shadow-lg w-full "
              type="submit"
            >
              Sign Up
            </button>
            <p
              className={
                showError ? "text-lg text-red-500" : "text-lg text-white"
              }
            >
              {error}
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Sign_up_Page;
