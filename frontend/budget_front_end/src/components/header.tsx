import { useContext } from "react";
import { AuthContext } from "../context/auth_context";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

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
  return (
    <>
      <div className="drop-shadow-xl bg-base-300 pb-3 pt-3 sm:p-0 sm:h-20 w-full flex justify-center ">
        <div className="sm:w-5/6 w-full gap-6 sm:gap-0  flex flex-col sm:flex-row ml-10 sm:ml-0 justify-between content-center sm:items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold ">Budgets</h1>
          </Link>
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
                <div className="max-w-[200px]  btn btn-accent text-lg shadow-lg">
                  {TruncateText({ text: user.email })}
                </div>
                <div
                  onClick={() => logoutButton()}
                  className="btn btn-accent text-lg shadow-lg"
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
