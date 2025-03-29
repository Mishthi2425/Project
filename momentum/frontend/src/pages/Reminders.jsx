import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const Reminders = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (newReminder.trim() !== "") {
      setReminders([...reminders, newReminder]);
      setNewReminder("");
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"}`}>
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-800 dark:text-white">Set Habit Reminders</h1>
        <div className="flex space-x-4 mb-4">
          <input 
            type="text" 
            className="px-4 py-2 border rounded-md flex-1" 
            placeholder="Enter reminder..." 
            value={newReminder} 
            onChange={(e) => setNewReminder(e.target.value)} 
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={addReminder}>Add</button>
        </div>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index} className="p-2 bg-white dark:bg-gray-700 rounded shadow-md mb-2">{reminder}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reminders;
