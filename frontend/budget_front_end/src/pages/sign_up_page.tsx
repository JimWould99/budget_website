import { useContext, useState } from "react";
import { AuthContext } from "../context/auth_context";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
const Sign_up_Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [confirm, setConfirm] = useState<string>("");
  const [showPass, setShowPass] = useState<string>("password");
  const [error, setError] = useState<boolean | null>(null);
  // const [loading, setLoading] = useState<boolean | null>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const sign_up_request = async () => {
    // setLoading(true);
    setError(null);
    const request_details = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/users/add_user`,
      request_details
    );
    const json = await response.json();
    console.log("json", json);
    if (!response.ok) {
      console.log(json.error);
      //setLoading(false);
      setError(json.error);
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
      <div className="flex justify-center bg-violet-100 min-h-[100vh]">
        <div className="w-5/6 sm:w-[500px]">
          <p className="mt-5 mb-5 text-2xl">Create Account</p>
          <form
            action=""
            onSubmit={handleSubmit}
            className=" flex flex-col gap-7  "
          >
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-none border border-black h-10 pl-4 w-full"
              placeholder="email"
            />
            <div className="flex gap-4 items-center">
              <input
                type={showPass}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-none border border-black h-10 pl-4 w-full"
                placeholder="password"
              />
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
            <button className="bg-white rounded-lg hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white w-1/2 text-lg">
              Sign up
            </button>
            <p className="text-lg text-red-500">{error}</p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Sign_up_Page;
