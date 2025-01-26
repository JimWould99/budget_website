import { useContext } from "react";
import { AuthContext } from "../context/auth_context";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const logoutButton = () => {
    logout();
    window.location.reload();
  };
  return (
    <>
      <div className="drop-shadow-xl bg-sky-400 pb-3 pt-3 sm:p-0 sm:h-20 w-full flex justify-center ">
        <div className="w-5/6 gap-4 sm:gap-0 flex flex-col sm:flex-row justify-between content-center sm:items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold ">Budgets</h1>
          </Link>
          <div className="flex  gap-4  w-100">
            {!user && (
              <>
                <Link to="/sign_up">
                  <button className="w-24 bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-24 bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap">
                    Log in
                  </button>
                </Link>
              </>
            )}
            {user && (
              <>
                <div className="bg-lime-50 text-black font-bold py-2 px-4 rounded text-nowrap">
                  {user.email}
                </div>
                <div
                  onClick={() => logoutButton()}
                  className="bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap"
                >
                  Log out
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
