import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth_context";
import { isButtonElement } from "react-router-dom/dist/dom";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const logoutButton = () => {
    logout();
    window.location.reload();
  };
  return (
    <>
      <div className="bg-sky-400 h-20 w-full flex justify-center ">
        <div className="w-5/6 flex justify-between content-center items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold ">Budgets</h1>
          </Link>
          <div className="flex gap-7 w-100">
            {!user && (
              <>
                <Link to="/sign_up">
                  <button className="bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap">
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
                <button
                  onClick={() => logoutButton()}
                  className="bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
