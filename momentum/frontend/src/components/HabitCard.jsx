import { Link } from 'react-router-dom';
import { getProgressColor } from '../lib/utils';

const HabitCard = ({ habit }) => {
  const { id, name, dateAdded, progress } = habit;
  
  return (
    <Link to={`/habit/${id}`} className="block">
      <div className="bg-purple-100 dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-white mb-2">{name}</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Added on: {new Date(dateAdded).toLocaleDateString()}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor(progress)}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-600 dark:text-gray-400">
          {progress}% complete
        </div>
      </div>
    </Link>
  );
};

export default HabitCard;