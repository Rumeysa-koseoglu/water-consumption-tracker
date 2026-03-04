function DailyUsageByCategory({ categories }: { categories: any }) {
  return (
    <div className="p-6 bg-[#243046] rounded-xl h-full ">
      <h3 className="text-[#9ec8fb] font-bold mb-4 uppercase">
        Usage By Category
      </h3>
      {Object.entries(categories).map(([name, value]) => (
        <div key={name} className="mb-3">
          <div className="flex justify-between text-base text-gray-400 mb-1">
            <span>{name}</span>
            <span>{Number(value).toFixed(1)} L</span>
          </div>
          <div className="w-full bg-gray-800 h-4 rounded-full">
            <div
              className="bg-[#79bef5] hover:bg-[#66ab4b] h-full rounded-full"
              style={{ width: `${Math.min((Number(value) / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyUsageByCategory;
