import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HabitProgressChart from "../components/HabitProgressChart";
import { useTheme } from "../context/ThemeContext";

const HabitDetail = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load habits from localStorage
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const foundHabit = habits.find(h => h.id === id);
    
    if (foundHabit) {
      setHabit(foundHabit);
    } else {
      // Habit not found, redirect to dashboard
      navigate('/dashboard');
    }
    
    setLoading(false);
  }, [id, navigate]);

  const updateProgress = (newProgress) => {
    if (!habit) return;
    
    // Get current habits
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    
    // Find and update the target habit
    const updatedHabits = habits.map(h => {
      if (h.id === id) {
        // Create a new progress history entry
        const newHistoryEntry = {
          date: new Date().toISOString(),
          progress: newProgress
        };
        
        // Update the habit
        return {
          ...h,
          progress: newProgress,
          progressHistory: [...h.progressHistory, newHistoryEntry]
        };
      }
      return h;
    });
    
    // Save updated habits
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    
    // Update local state
    setHabit(prevHabit => ({
      ...prevHabit,
      progress: newProgress,
      progressHistory: [...prevHabit.progressHistory, {
        date: new Date().toISOString(),
        progress: newProgress
      }]
    }));
  };

  const deleteHabit = () => {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const updatedHabits = habits.filter(h => h.id !== id);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    navigate('/dashboard');
  };

  const getProgressButtonClass = (value, currentProgress) => {
    const baseClass = "py-2 px-4 rounded-md transition-colors font-medium ";
    
    if (value === currentProgress) {
      return baseClass + "bg-purple-600 text-white";
    }
    
    return baseClass + "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600";
  };

  if (loading || !habit) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex h-screen transition-all duration-400 ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"
    }`}>
      {/* Sidebar */}
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-pink-100 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-purple-800 dark:text-white">{habit.name}</h1>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Added on: {new Date(habit.dateAdded).toLocaleDateString()}
          </div>
          
          {habit.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-4">{habit.description}</p>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Current Progress</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full ${getProgressColor(habit.progress)}`} 
                style={{ width: `${habit.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              {habit.progress}% complete
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Update Progress</h3>
            <div className="flex flex-wrap gap-2">
              {[0, 25, 50, 75, 100].map(value => (
                <button
                  key={value}
                  onClick={() => updateProgress(value)}
                  className={getProgressButtonClass(value, habit.progress)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={deleteHabit} 
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            Delete Habit
          </button>
        </div>
        
        <div className="bg-purple-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
          <HabitProgressChart progressHistory={habit.progressHistory} />
        </div>
      </div>
    </div>
  );
};

// Helper function to get progress color
const getProgressColor = (progress) => {
  if (progress === 0) return 'bg-gray-300';
  if (progress <= 25) return 'bg-orange-400';
  if (progress <= 50) return 'bg-yellow-400';
  if (progress <= 75) return 'bg-blue-400';
  return 'bg-green-400';
};

export default HabitDetail;
