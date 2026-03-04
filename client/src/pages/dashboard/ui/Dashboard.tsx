import { useEffect, useState } from "react";
import DailyEntry from "../../../features/water-entry/ui/DailyEntry.js";
import DailyTotal from "../../../entities/water-usage/ui/DailyTotal.js";
import DailyUsageByCategory from "../../../entities/water-usage/ui/DailyUsageByCategory.js";
import DailyUsageList from "../../../widgets/usage-list/ui/DailyUsageList.js";
import Header from "../../../widgets/header/ui/Header.js";
import WeeklyUsageSummary from "../../../entities/water-usage/ui/WeeklyUsageSummary.js";

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [editEntry, setEditEntry] = useState<any | null>(null);

  const fetchEntries = async () => {
    const baseURL = import.meta.env.VITE_API_URL;

    const URL = `${baseURL}/api/water/get-entries`;
    console.log("fetching from;", URL);

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const totalLiters = (Array.isArray(entries) ? entries : []).reduce(
    (acc: any, curr) => acc + Number(curr.amount || 0),
    0
  );

  const categoryTotals = entries.reduce((acc: any, curr) => {
    const cat = curr.category || "Other";
    acc[cat] = (acc[cat] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const deleteEntry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    const baseURL = import.meta.env.VITE_API_URL;

    const URL = `${baseURL}/api/water/delete-entry/${id}`;

    try {
      const res = await fetch(URL, {
        method: "DELETE",
      });

      if (res.ok) fetchEntries();
    } catch (err) {
      console.error("Delete Failed");
    }
  };

  const handleEdit = (entry: any) => {
    setEditEntry(entry);
    document
      .getElementById("entry-container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const getWeeklyData = (entries: any) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const summary = days.map((day) => ({ day, total: 0 }));

    entries.forEach((entry: any) => {
      const date = new Date(entry.date);
      const dayName = days[date.getDay()];
      const dayObj = summary.find((d) => d.day === dayName);
      if (dayObj) dayObj.total += Number(entry.amount || 0);
    });
    return summary;
  };

  const weeklyData = getWeeklyData(entries);

  return (
    <div className="w-screen h-screen flex flex-col font-outfit p-4 pt-0 overflow-auto">
      <Header />
      <div className="p-0 sm:p-3 md:p-8 flex flex-col lg:grid grid-cols-2 gap-6">
        <DailyEntry
          onEntryAdded={fetchEntries}
          editEntry={editEntry}
          setEditEntry={setEditEntry}
        />
        <DailyTotal total={totalLiters} limit={150} />
        <DailyUsageByCategory categories={categoryTotals} />
        <WeeklyUsageSummary data={weeklyData} />
        <DailyUsageList
          entries={entries}
          onDelete={deleteEntry}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Dashboard;
