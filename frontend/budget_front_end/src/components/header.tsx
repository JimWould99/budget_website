import { useContext } from "react";
import { AuthContext } from "../context/auth_context";
import { SidebarContext } from "../context/sidebar_context";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import logout_svg from "../assets/logout-svgrepo-com.svg";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { sideBarShown, setSideBarShown } = useContext(SidebarContext);

  const location = useLocation();

  const logoutButton = () => {
    logout();
    window.location.reload();
  };

  console.log("location", location.pathname);
  return (
    <>
      <div className="sticky rounded-box top-0 z-50 opacity-95 drop-shadow-xl bg-primary py-4 w-full flex justify-center ">
        <div className="md:px-10 sm:px-6 px-4  w-full sm:gap-0 gap-4 flex flex-row sm:ml-0 justify-between sm:justify-between sm:content-center sm:items-center">
          <Link className="hidden lg:block" to="/">
            <h1 className="text-3xl font-bold text-primary-content">
              BetterBudgets AI
            </h1>
          </Link>
          <div className="dropdown display:block lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn border-primary-content m-1"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#D6F3FF"
                color="white"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content flex flex-col gap-2 bg-base-100 rounded-box z-[1] p-2 shadow"
            >
              <Link to="/">
                <button
                  className={`btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg ${
                    location.pathname === "/" ? "btn-accent" : ""
                  }`}
                >
                  Home
                </button>
              </Link>
              <Link to="/analysis">
                <button
                  className={`btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg  ${
                    location.pathname === "/analysis" ? "btn-accent" : ""
                  }`}
                >
                  Analysis
                </button>
              </Link>
              <Link to="/advice">
                <button
                  className={`btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg ${
                    location.pathname === "/advice" && "btn-accent"
                  }`}
                >
                  Advice
                </button>
              </Link>
            </ul>
          </div>

          {!user && (
            <>
              <div className="flex items-center gap-4 w-100">
                <Link to="/sign_up">
                  <button className="btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
          {user && (
            <>
              <div className="flex items-center gap-4 lg:gap-10 w-100">
                <button className="btn lg:hidden btn-accent btn-sm w-24 h-10 pyt text-lg shadow-lg">
                  {location.pathname === "/advice" && "Advice"}
                  {location.pathname === "/analysis" && "Analysis"}
                  {location.pathname === "/" && "Home"}
                </button>
                <div className="hidden lg:flex gap-2">
                  <Link to="/">
                    <button
                      className={`btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg ${
                        location.pathname === "/" ? "btn-accent" : ""
                      }`}
                    >
                      Home
                    </button>
                  </Link>
                  <Link to="/analysis">
                    <button
                      className={`btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg  ${
                        location.pathname === "/analysis" ? "btn-accent" : ""
                      }`}
                    >
                      Analysis
                    </button>
                  </Link>
                  <Link to="/advice">
                    <button
                      className={`btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg ${
                        location.pathname === "/advice" && "btn-accent"
                      }`}
                    >
                      Advice
                    </button>
                  </Link>
                </div>
                <button
                  onClick={() => logoutButton()}
                  className="btn btn-secondary btn-sm w-24 h-10 pyt text-lg shadow-lg"
                >
                  <p className="hidden sm:block ">Log out</p>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                    className="w-8 h-10 sm:hidden block"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      color="white"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
