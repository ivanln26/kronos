const Week = () => {
  return (
    <div className="p-2">
      <div className="flex justify-between p-2 rounded-md font-bold select-none bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        <div className="flex flex-col px-3 py-2 rounded-md bg-primary-40 text-white dark:bg-primary-80 dark:text-primary-20">
          <p className="text-center">L</p>
          <p>25</p>
        </div>
        <div className="flex flex-col rounded-md px-3 py-2">
          <div className="text-center">M</div>
          <div>26</div>
        </div>
        <div className="flex flex-col rounded-md px-3 py-2">
          <div className="text-center">X</div>
          <div>27</div>
        </div>
        <div className="flex flex-col rounded-md px-3 py-2">
          <div className="text-center">J</div>
          <div>28</div>
        </div>
        <div className="flex flex-col rounded-md px-3 py-2">
          <div className="text-center">V</div>
          <div>29</div>
        </div>
        <div className="flex flex-col rounded-md px-3 py-2">
          <div className="text-center">S</div>
          <div>30</div>
        </div>
        <div className="flex flex-col rounded-md px-3 py-2">
          <div className="text-center">D</div>
          <div>01</div>
        </div>
      </div>
    </div>
  );
};

export default Week;
