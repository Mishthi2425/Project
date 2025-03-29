import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthForm = ({ isSignup, setIsSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isSignup) {
        signup(email, password);
      } else {
        login(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="bg-pink-200 dark:bg-gray-800 p-8 shadow-lg rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-800 dark:text-white">
        {isSignup ? "Sign Up" : "Login"}
      </h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email" 
            className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-300 bg-pink-100 dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Enter your password" 
            className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-300 bg-pink-100 dark:bg-gray-700"
          />
        </div>
        {isSignup && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirm your password" 
              className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
            />
          </div>
        )}
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition">
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span
            className="text-purple-500 cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
