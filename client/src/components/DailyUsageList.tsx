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
    <div className="bg-[#243046] rounded-xl p-6 col-span-2">
      <table className="w-full text-left text-gray-400">
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
              className="border-b border-gray-700 hover:bg-[#2d3a54]"
            >
              <td className="p-3 text-[#9ec8fb]">{formatDate(item.date)}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3 text-[#79bef5] font-bold">{item.amount}L</td>
              <td className="p-3 flex justify-center gap-4">
                <button
                  onClick={() => onEdit(item)}
                  className="text-[#90b988] hover:text-blue-200 transition-colors cursor-pointer"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-[#793328] hover:text-red-200 transition-colors ml-3 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DailyUsageList;
