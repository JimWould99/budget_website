import { useContext, useState } from "react";
import { AuthContext } from "../context/auth_context";

const Sign_up_Page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean);
  const { user, login, logout } = useContext(AuthContext);

  const sign_up_request = async () => {
    setLoading(true);
    setError(null);

    const request_details = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, username, password }),
    };
    const response = await fetch(
      `http://localhost:3005/users/add_user`,
      request_details
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      console.log("response okay");
      localStorage.setItem("user", JSON.stringify(json));
      login(json);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sign_up_request();
  };

  const handleButtonSubmit = async () => {
    sign_up_request();
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/3">
          <p className="mt-5 mb-5">Sign Up Page</p>
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
              className="border border-black h-10"
              placeholder="email"
            />
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="border border-black h-10"
              placeholder="name"
            />
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              id="usename"
              className="border border-black h-10"
              placeholder="username"
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
              Sign Up
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sign_up_Page;
