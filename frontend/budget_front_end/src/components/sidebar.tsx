import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  // const [selected, setSelected] = useState("Home");

  const location = useLocation();

  return (
    <>
      <div className="w-10 px-32 sm:px-14  bg-primary h-[94vh] sm:h-[88vh]  z-10 sticky sm:top-20  flex flex-col justify-around items-center">
        <Link to="/">
          <button
            className={`btn btn-secondary w-32 sm:w-20 btn-lg sm:btn-md ${
              location.pathname === "/" ? "btn-info" : ""
            }`}
          >
            Home
          </button>
        </Link>
        <Link to="/analysis">
          <button
            className={`btn btn-secondary w-32  sm:w-20 btn-lg sm:btn-md  ${
              location.pathname === "/analysis" ? "btn-info" : ""
            }`}
          >
            Analysis
          </button>
        </Link>
        <Link to="/advice">
          <button
            className={`btn btn-secondary w-32 text-nowrap sm:w-20  btn-lg sm:btn-md ${
              location.pathname === "/advice" && "btn-info"
            }`}
          >
            AI advice
          </button>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
