import { FolderPlus } from "lucide-react";
import React, { useState } from "react";

function DailyEntry() {
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  console.log("date:", date, "amount:", amount, "category:", category);

  const submitEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URL = "http://localhost:5500/api/water/add-entry";

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, amount, category }),
      });

      const data = await res.json();

      if (res.ok) {
        setDate("");
        setAmount(0);
        setCategory("");
        console.log("entry added successfully:", data);
      } else {
        console.error("server error:", data.message);
      }
    } catch (err) {
      console.error("error submitting form:", err);
    }
  };

  return (
    <div
      className="w-120  p-5 bg-[#243046] rounded-xl text-gray-400"
      id="entry-container"
    >
      <h1 className="mb-4 text-lg font-bold text-gray-200">
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
            className="bg-[#284d79] rounded-lg py-1 px-4 text-base"
          />
        </div>
        <div className="flex flex-row justify-between">
          <label>Water Amount (liters)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="outline-none border border-[#284d79] focus:border-blue-400 rounded-lg p-1"
          />
        </div>
        {/* usage type */}
        <div className="gap-5 flex flex-row items-end justify-between">
          <label className="">Usage Type</label>
          <select
            name="usage-types"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#284d79] rounded-lg py-1 px-4"
          >
            <option value="Cooking">Cooking</option>
            <option value="Bathing">Bathing</option>
            <option value="Washing">Washing</option>
            <option value="Drinking">Drinking</option>
          </select>
        </div>
        <button className="bg-[#284d79] rounded-3xl mt-4 text-gray-200 font-bold flex items-center justify-start gap-4 py-2 px-4 w-[40%] cursor-pointer active:scale-95">
          <FolderPlus size={25} color="#0a2a50" /> Add Entry
        </button>
      </form>
    </div>
  );
}

export default DailyEntry;
