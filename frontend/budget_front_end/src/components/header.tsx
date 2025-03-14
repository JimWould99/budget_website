import { useContext } from "react";
import { AuthContext } from "../context/auth_context";
import { SidebarContext } from "../context/sidebar_context";

import { Link } from "react-router-dom";
import logout_svg from "../assets/logout-svgrepo-com.svg";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { sideBarShown, setSideBarShown } = useContext(SidebarContext);

  const TruncateText = ({ text }: { text: string }) => {
    if (text.length <= 9) {
      return <span>{text}</span>;
    } else if (text.length <= 25) {
      return <span className="text-sm">{text}</span>;
    } else if (text.length <= 30) {
      return <span className="text-xs">{text}</span>;
    } else {
      const truncatedText = `${text.slice(0, 25)}...${text.slice(-4)}`;
      return <span className="text-xs">{truncatedText}</span>;
    }
  };

  const logoutButton = () => {
    logout();
    window.location.reload();
  };

  let hamburgerClass;

  if (sideBarShown) {
    hamburgerClass = "btn btn-primary display:block sm:hidden ";
  } else {
    hamburgerClass = "btn  display:block sm:hidden";
  }
  return (
    <>
      <div className="sticky top-0 z-50 opacity-95 drop-shadow-xl bg-primary py-4 w-full flex justify-center ">
        <div className="md:px-10 sm:px-6 px-4  w-full sm:gap-0 gap-4 flex flex-row sm:ml-0 justify-between sm:justify-between sm:content-center sm:items-center">
          <Link className="hidden sm:block" to="/">
            <h1 className="text-3xl font-bold text-primary-content">
              BetterBudgets AI
            </h1>
          </Link>
          <button
            onClick={() => {
              setSideBarShown((prev: boolean) => !prev);
            }}
            className={hamburgerClass}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
          <div className="flex items-center gap-4 w-100">
            {!user && (
              <>
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
              </>
            )}
            {user && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
