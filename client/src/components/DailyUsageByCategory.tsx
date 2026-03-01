import React from "react";

function DailyUsageByCategory({ categories }: { categories: any }) {
  return (
    <div className="p-6 bg-[#243046] rounded-xl">
      <h3 className="text-gray-200 font-bold mb-4">Usage By Category</h3>
      {Object.entries(categories).map(([name, value]) => (
        <div key={name} className="mb-3">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{name}</span>
            <span>{Number(value).toFixed(1)} L</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full">
            {/* Using a simple blue bar as the "Chart" */}
            <div
              className="bg-[#79bef5] h-2 rounded-full"
              style={{ width: `${Math.min((Number(value) / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyUsageByCategory;
