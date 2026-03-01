const DailyTotal = ({ total, limit }: { total: number; limit: number }) => {
  const isOverLimit = total > limit;

  return (
    <div
      className={`p-6 rounded-xl border-2 ${
        isOverLimit
          ? "border-red-500 bg-red-900/20"
          : "bg-[#243046] border-transparent"
      }`}
    >
      <h3 className="text-gray-400 text-sm font-bold uppercase">Total Usage</h3>
      <p
        className={`text-4xl font-bold ${
          isOverLimit ? "text-red-500" : "text-[#79bef5]"
        }`}
      >
        {total.toFixed(2)} L
      </p>
      {isOverLimit && (
        <p className="text-red-400 text-sm mt-2 font-bold animate-pulse">
          MicrophoneWarning: You have exceeded your {limit}L limit!
        </p>
      )}
    </div>
  );
};

export default DailyTotal;
