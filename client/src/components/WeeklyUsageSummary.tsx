interface WeeklyData {
  day: string;
  total: number;
}

interface WeeklyUsageSummaryProps {
  data: WeeklyData[];
}

function WeeklyUsageSummary({ data }: WeeklyUsageSummaryProps) {
  const maxUsage = Math.max(...data.map((d) => d.total), 1);
  return (
    <div className="h-60 md:h-100 ">
      <div className="bg-[#243046] p-6 rounded-2xl h-full">
        <h3 className="text-[#9ec8fb] text-lg md:text-xl font-bold md:mb-8 uppercase">
          Weekly Usage Summary
        </h3>

        <div className="flex justify-center h-full md:h-[80%] md:px-2 pb-4 md:pb-0 items-end">
          {data.map((item) => {
            const barHeight = (item.total / maxUsage) * 100;

            return (
              <div
                key={item.day}
                className="flex flex-col items-center flex-1 h-full justify-end group"
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 bg-[#1b2537] text-blue-400 text-xs py-1 px-2 rounded mb-2 transition-opacity">
                  {item.total.toFixed(1)}L
                </div>

                {/* The Bar */}
                <div
                  className="w-5 md:w-8 bg-[#79bef5] rounded-t-lg transition-all duration-300 ease-out hover:bg-[#66ab4b] cursor-pointer"
                  style={{
                    height: `${Math.max(barHeight, item.total > 0 ? 5 : 0)}%`,
                  }}
                ></div>

                {/* Day Label */}
                <span className="text-[#96cde0] text-xs md:text-sm mt-3 font-medium">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeeklyUsageSummary;
