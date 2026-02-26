import DailyEntry from "./DailyEntry";
import DailyTotal from "./DailyTotal";
import DailyUsageByCategory from "./DailyUsageByCategory";
import DailyUsageList from "./DailyUsageList";
import Header from "./Header";
import WeeklyUsageSummary from "./WeeklyUsageSummary";

const Dashboard: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <DailyEntry />
      <DailyTotal />
      <DailyUsageByCategory />
      <DailyUsageList />
      <WeeklyUsageSummary />
    </div>
  );
};

export default Dashboard;
