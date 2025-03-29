import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Insights = () => {
  const { darkMode, setDarkMode } = useTheme(); 
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    setHabits(storedHabits);
  }, []);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"}`}>
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-800 dark:text-white">Habit Insights & Analytics</h1>

        {/* If no habits exist, show a message and Add Habit button */}
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              No habits found! Start tracking your progress by adding a new habit.
            </p>
            <button
              onClick={() => navigate("/add-habit")}
              className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Add Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {habits.map((habit) => {
              if (!habit.progressHistory || habit.progressHistory.length === 0) {
                return null; // Skip habits with no progress data
              }

              const labels = habit.progressHistory.map((entry) =>
                new Date(entry.date).toLocaleDateString()
              );

              const data = {
                labels,
                datasets: [
                  {
                    label: `${habit.name} Progress`,
                    data: habit.progressHistory.map((entry) => entry.progress),
                    borderColor: "#8B5CF6",
                    backgroundColor: "rgba(139, 92, 246, 0.5)",
                    tension: 0.4,
                  },
                ],
              };

              return (
                <div key={habit.id} className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {habit.name}
                  </h2>
                  <Line data={data} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
