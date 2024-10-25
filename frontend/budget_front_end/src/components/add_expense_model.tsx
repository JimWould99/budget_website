const Add_expense_model = () => {
  const handleSubmit = async (e) => {};
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form action="" onSubmit={handleSubmit}>
            <p className="text-2xl">New Expense</p>
            <div className="w-full">
              <p>Name</p>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-black h-10 w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <p>Maximum spend</p>
              <input
                type="number"
                name="amount"
                id="amount"
                className="border border-black h-10 w-full"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <div>
              <p>Budget</p>
              <input
                type="number"
                name="budget"
                id="budget"
                className="border border-black h-10 w-full"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded text-nowrap hover:bg-white hover:text-black hover:drop-shadow-2xl "
              onClick={() => document.getElementById("my_modal_2").close()}
            >
              Add budget
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Add_expense_model;
