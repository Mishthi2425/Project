import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const Streaks = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    
    const calculateStreak = (progressHistory) => {
      if (!progressHistory.length) return 0;
      
      let streak = 0;
      let today = new Date().setHours(0, 0, 0, 0);
      
      for (let i = progressHistory.length - 1; i >= 0; i--) {
        let progressDate = new Date(progressHistory[i].date).setHours(0, 0, 0, 0);
        
        if (progressDate === today && progressHistory[i].progress > 0) {
          streak++;
          today -= 86400000; // Move to the previous day
        } else if (progressDate < today) {
          break;
        }
      }
      return streak;
    };

    const streakData = habits.map(habit => ({
      habit: habit.name,
      days: calculateStreak(habit.progressHistory)
    })).filter(h => h.days > 0);

    setStreaks(streakData);
  }, []);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"}`}>
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-800 dark:text-white">Habit Streaks & Rewards</h1>
        {streaks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No streaks yet! Stay consistent to earn rewards.</p>
        ) : (
          <ul className="space-y-4">
            {streaks.map((streak, index) => (
              <li key={index} className="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
                {streak.habit} - {streak.days} day streak 🔥
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Streaks;