import { Pencil, Trash2 } from "lucide-react";

function DailyUsageList({
  entries,
  onDelete,
  onEdit,
}: {
  entries: any[];
  onDelete: (id: string) => void;
  onEdit: (item: any) => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <div className="bg-[#243046] rounded-xl p-4 md:p-6 col-span-2">
      <h3 className="text-[#9ec8fb] text-xl md:text-lg uppercase font-bold mb-2 hidden md:block">
        Usage History
      </h3>
      {/* Table View (Desktop/Tablet) */}
      <table className="hidden md:table w-full text-left text-gray-400">
        <thead className="bg-[#1b2537] text-sm uppercase">
          <tr className="text-[#2160ac]">
            <th className="p-3">Date</th>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-700 hover:bg-[#2d3a54] transition-colors"
            >
              <td className="p-3 text-[#9ec8fb]">{formatDate(item.date)}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3 text-[#79bef5] font-bold">{item.amount}L</td>
              <td className="p-3 flex justify-center gap-4">
                <button
                  onClick={() => onEdit(item)}
                  className="text-[#90b988] hover:text-green-300 transition-colors cursor-pointer"
                  title="Edit Entry"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-[#793328] hover:text-red-400 transition-colors ml-3 cursor-pointer"
                  title="Delete Entry"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card View (Mobile) */}
      <div className="md:hidden flex flex-col gap-4">
        <h3 className="text-[#9ec8fb] text-xl uppercase font-bold mb-2">
          Usage History
        </h3>
        {entries.map((item) => (
          <div
            key={item.id}
            className="bg-[#1b2537] p-4 rounded-lg flex justify-between items-center border-l-4 border-[#79bef5]"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[#9ec8fb] font-bold text-lg">
                {formatDate(item.date)}
              </span>
              <span className="text-gray-400 text-sm">
                {item.category} •{" "}
                <span className="text-[#79bef5] font-bold">{item.amount}L</span>
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onEdit(item)}
                className="text-[#90b988] p-2 bg-[#243046] rounded-full active:scale-90 transition-all"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-[#793328] p-2 bg-[#243046] rounded-full active:scale-90 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyUsageList;
