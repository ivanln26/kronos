const CardSkeleton = () => {
  return (
    <div className="flex h-20 md:h-28 rounded-xl animate-pulse bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
      <div className="flex flex-col justify-center items-center basis-1/5 md:basis-1/6">
        <div className="h-4 md:h-6 w-10 md:w-16 rounded bg-primary-40/[.20] dark:bg-neutral-20" />
        -
        <div className="h-4 md:h-6 w-10 md:w-16 rounded bg-primary-40/[.20] dark:bg-neutral-20" />
      </div>
      <div className="px-2 flex flex-col grow justify-center gap-y-1 border-l-8 border-blue-500">
        <div className="h-4 md:h-6 w-40 md:w-80 rounded bg-primary-40/[.20] dark:bg-neutral-20" />
        <div className="h-4 md:h-6 w-40 md:w-80 rounded bg-primary-40/[.20] dark:bg-neutral-20" />
        <div className="h-4 md:h-6 w-40 md:w-80 rounded bg-primary-40/[.20] dark:bg-neutral-20" />
      </div>
    </div>
  );
};

export default CardSkeleton;
