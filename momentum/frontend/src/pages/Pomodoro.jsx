import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const Pomodoro = () => {
    const { darkMode, setDarkMode } = useTheme();
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);

    return (
        <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-200 to-pink-200"}`}>
      <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6 text-purple-800 dark:text-white">Pomodoro Timer</h1>
                <div className="text-5xl font-bold">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}</div>
                <div className="mt-4">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-2" onClick={startTimer}>Start</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={stopTimer}>Stop</button>
                </div>
            </div>
        </div>
    );
};

export default Pomodoro;