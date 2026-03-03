function DailyUsageList({ entries }: { entries: any[] }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <div className="bg-[#243046] rounded-xl p-6 text-sm max-h-65 w-full overflow-auto no-scrollbar">
      <h3 className="text-gray-200 font-bold mb-4 text-base">
        Detailed History
      </h3>
      <table className="w-full text-gray-400">
        <thead className="text-xs uppercase bg-[#1b2537]">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody className="">
          {entries.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-700 hover:bg-[#2d3a54]"
            >
              <td className="p-3">{formatDate(item.date)}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3 text-blue-400">{item.amount} L</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DailyUsageList;
