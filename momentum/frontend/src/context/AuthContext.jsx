import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // Mock authentication (Replace with API call)
    if (email && password) {
      setUser({ email });
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard');
    }
  };

  const signup = (email, password) => {
    // Mock signup logic (Replace with API call)
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;