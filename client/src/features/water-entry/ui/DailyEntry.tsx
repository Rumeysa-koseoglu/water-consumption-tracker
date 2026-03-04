import { FolderPlus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DailyEntryProps {
  onEntryAdded: () => void;
  editEntry: any | null;
  setEditEntry: (val: any) => void;
}

function DailyEntry({
  onEntryAdded,
  editEntry,
  setEditEntry,
}: DailyEntryProps) {
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (editEntry) {
      setDate(editEntry.date.split("T")[0]);
      setAmount(editEntry.amount);
      setCategory(editEntry.category);
    }
  }, [editEntry]);

  const submitEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const method = editEntry ? "PUT" : "POST";

    const URL = editEntry
      ? `${import.meta.env.VITE_API_URL}/api/water/entries/${editEntry.id}`
      : `${import.meta.env.VITE_API_URL}/api/water/add-entry`;

    try {
      const res = await fetch(URL, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, amount, category }),
      });

      if (res.ok) {
        const data = await res.json();
        onEntryAdded();
        setEditEntry(null);
        setDate("");
        setAmount(1);
        setCategory("");
        console.log("entry added/updated successfully:", data);
      } else {
        const errorText = await res.text();
        console.error("server error:", res.status, errorText);
      }
    } catch (err) {
      console.error("error submitting form:", err);
    }
  };

  return (
    <div
      className={`p-5 bg-[#243046] rounded-xl text-gray-400 ${
        editEntry && "border border-blue-700 shadow shadow-blue-400"
      }`}
      id="entry-container"
    >
      <h1 className="mb-6 text-lg lg:text-xl font-bold text-[#9ec8fb] uppercase">
        Daily Water Entry
      </h1>
      <form className="flex flex-col gap-5" onSubmit={submitEntry}>
        {/* date */}
        <div className="flex flex-row justify-between items-center">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#284d79] rounded-lg py-1 md:py-2 px-4 text-base"
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <label>Water Amount (liters)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="outline-none border border-[#284d79] focus:border-blue-400 rounded-lg p-1 pl-3 w-[60%] md:w-[50%] lg:w-[40%] h-10 "
          />
        </div>
        {/* usage type */}
        <div className="gap-5 flex flex-row items-end justify-between">
          <label className="">Usage Type</label>
          <select
            name="usage-types"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#284d79] rounded-lg py-1 md:py-2 px-4"
          >
            <option value="Cooking">Cooking</option>
            <option value="Bathing">Bathing</option>
            <option value="Washing">Washing</option>
            <option value="Drinking">Drinking</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="bg-[#284d79] rounded-3xl mt-4 text-gray-200 md:text-lg font-bold flex items-center justify-start py-2 lg:py-3 px-5 cursor-pointer active:scale-95">
          <FolderPlus size={25} color="#13325b" />
          <span className="ml-[25%] md:ml-[40%]">
            {editEntry ? "Update Entry" : "Add Entry"}
          </span>
        </button>
      </form>
    </div>
  );
}

export default DailyEntry;
