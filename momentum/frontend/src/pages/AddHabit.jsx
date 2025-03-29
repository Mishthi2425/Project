import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const AddHabit = () => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!habitName.trim()) return;
    
    // Get existing habits or initialize empty array
    const existingHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    
    // Create new habit
    const newHabit = {
      id: Date.now().toString(),
      name: habitName,
      description: habitDescription,
      dateAdded: new Date().toISOString(),
      progress: 0,
      progressHistory: [{
        date: new Date().toISOString(),
        progress: 0
      }]
    };
    
    // Add to habits array
    const updatedHabits = [...existingHabits, newHabit];
    
    // Save to localStorage
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <div className={`flex h-screen transition-all duration-400 ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"
    }`}>
      {/* Sidebar */}
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-md bg-pink-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-800 dark:text-white">
            Add New Habit
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Habit Name
              </label>
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="E.g., Daily Reading, Exercise, Meditation"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={habitDescription}
                onChange={(e) => setHabitDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Why do you want to build this habit?"
                rows="4"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
            >
              Add Habit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;