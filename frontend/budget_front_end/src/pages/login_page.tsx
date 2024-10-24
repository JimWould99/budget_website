import { useContext, useState } from "react";
import { AuthContext } from "../context/auth_context";

const Login_page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const { user, login, logout } = useContext(AuthContext);

  const login_request = async () => {
    setLoading(true);
    setError(null);

    const request_details = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      `http://localhost:3005/users/login_user`,
      request_details
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      login(json);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login_request();
  };

  const handleButtonSubmit = async () => {
    login_request();
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/3">
          <p className="mt-5 mb-5">Login Page</p>
          <form
            action=""
            onSubmit={handleSubmit}
            className=" flex flex-col gap-7 "
          >
            <div className=""></div>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="border border-black h-10"
              placeholder="email"
            />
            <input
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="border border-black h-10"
              placeholder="password"
            />
            <div onClick={handleButtonSubmit} className="w-1/3 ml-0">
              Login
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login_page;
