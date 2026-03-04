import { useEffect, useState } from "react";
import DailyEntry from "./DailyEntry";
import DailyTotal from "./DailyTotal";
import DailyUsageByCategory from "./DailyUsageByCategory";
import DailyUsageList from "./DailyUsageList";
import Header from "./Header";
import WeeklyUsageSummary from "./WeeklyUsageSummary";

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [editEntry, setEditEntry] = useState<any | null>(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5500/api/water/get-entries");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const totalLiters = entries.reduce(
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

    try {
      const res = await fetch(
        `http://localhost:5500/api/water/delete-entry/${id}`,
        {
          method: "DELETE",
        }
      );

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
      <div className="p-8 grid grid-cols-2 gap-6">
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
