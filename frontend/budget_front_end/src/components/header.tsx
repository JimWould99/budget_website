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
      <div className="position: sticky top-0 z-50 opacity-95 drop-shadow-xl bg-base-300 pb-3 pt-3 sm:p-0 sm:h-20 w-full flex justify-center ">
        <div className="md:pr-24 md:pl-52 sm:pr-24 sm:pl-24 px-4  w-full sm:gap-0 gap-4 flex flex-row sm:ml-0 justify-between sm:justify-between sm:content-center sm:items-center">
          <Link className="hidden sm:block" to="/">
            <h1 className="text-3xl font-bold text-primary">
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
          <div className="flex gap-4 w-100">
            {!user && (
              <>
                <Link to="/sign_up">
                  <button className="btn btn-accent text-lg shadow-lg">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn btn-accent text-lg shadow-lg">
                    Log in
                  </button>
                </Link>
              </>
            )}
            {user && (
              <>
                <button className="max-w-[200px]  btn btn-accent text-lg shadow-lg">
                  {TruncateText({ text: user.email })}
                </button>
                <button
                  onClick={() => logoutButton()}
                  className="btn px-2 sm:btn-md btn-accent text-lg shadow-lg"
                >
                  <p className="hidden sm:block ">Log out</p>
                  <p className="sm:hidden block"></p>
                  <img
                    className="sm:hidden block"
                    src={logout_svg}
                    width={24}
                    height={24}
                  />
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
