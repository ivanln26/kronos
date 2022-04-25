const Week = () => {
  return (
    <div className="flex justify-evenly p-2">
      <div className="flex flex-col bg-blue-500 rounded-md px-3 py-2 font-bold">
        <p className="text-center">L</p>
        <p>25</p>
      </div>
      <div className="flex flex-col dark:bg-[#1e1e1e] rounded-md px-3 py-2 border border-[#575757] text-white font-bold">
        <div className="text-center">M</div>
        <div>26</div>
      </div>
      <div className="flex flex-col dark:bg-[#1e1e1e] rounded-md px-3 py-2 border border-[#575757] text-white font-bold">
        <div className="text-center">X</div>
        <div>27</div>
      </div>
      <div className="flex flex-col dark:bg-[#1e1e1e] rounded-md px-3 py-2 border border-[#575757] text-white font-bold">
        <div className="text-center">J</div>
        <div>28</div>
      </div>
      <div className="flex flex-col dark:bg-[#1e1e1e] rounded-md px-3 py-2 border border-[#575757] text-white font-bold">
        <div className="text-center">V</div>
        <div>29</div>
      </div>
    </div>
  );
};

export default Week;
