const Header = () => {
  return (
    <>
      <div className="bg-sky-400 h-20 w-full flex justify-center ">
        <div className="w-5/6 flex justify-between content-center items-center">
          <h1 className="text-3xl font-bold ">Budgets</h1>
          <div className="flex gap-7 w-100">
            <button className="bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap">
              Sign up
            </button>
            <button className="bg-lime-50 hover:bg-blue-900 hover:text-white text-black font-bold py-2 px-4 rounded text-nowrap">
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
