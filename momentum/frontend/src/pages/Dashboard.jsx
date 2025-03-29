import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HabitCard from "../components/HabitCard";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [habits, setHabits] = useState([]);
  
  useEffect(() => {
    // Load habits from localStorage
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  return (
    <div className={`flex h-screen transition-all duration-400 ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"
    }`}>
      {/* Sidebar */}
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-800 dark:text-white">
          Track Your Daily Habits
        </h1>

        {habits.length === 0 ? (
          <div className="bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              You haven't added any habits yet. Click on "Add Habit" to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map(habit => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;