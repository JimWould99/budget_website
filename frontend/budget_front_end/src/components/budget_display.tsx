const Budget_display = ({ budget }) => {
  const name = budget.name;
  const amount = budget.amount;
  return (
    <>
      <div className="border-2 border-black p-4 flex flex-col gap-y-6">
        <div className="flex justify-between">
          <p className="text-xl">{name}</p>
          <p className="text-xl">$0 / ${amount}</p>
        </div>
        <div className="flex justify-between gap-4">
          <button className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white">
            Add expense
          </button>
          <button className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white">
            View expenses
          </button>
        </div>
      </div>
    </>
  );
};

export default Budget_display;
