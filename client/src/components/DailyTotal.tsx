const DailyTotal = ({ total, limit }: { total: number; limit: number }) => {
  const isOverLimit = total > limit;

  return (
    <div
      className={`p-4 rounded-xl border-2 ${
        isOverLimit
          ? "border-red-500 bg-red-900/20"
          : "bg-[#243046] border-transparent"
      }`}
    >
      <h3
        className={` mb-4 text-lg font-bold uppercase ${
          isOverLimit ? "text-red-500" : "text-[#9ec8fb]"
        }`}
      >
        Total Usage
      </h3>
      <div className="flex flex-col items-start justify-center gap-10 p-4">
        <p
          className={`text-5xl font-bold ${
            isOverLimit ? "text-red-500" : "text-[#79bef5]"
          }`}
        >
          {total.toFixed(2)} L
        </p>
        {isOverLimit ? (
          <p className="text-red-400 text-3xl mt-2 font-bold animate-pulse">
            You have exceeded your {limit}L limit!
          </p>
        ) : (
          <p className=" text-[#9fbd92] text-3xl">(Your daily limit is 150L)</p>
        )}
      </div>
    </div>
  );
};

export default DailyTotal;
