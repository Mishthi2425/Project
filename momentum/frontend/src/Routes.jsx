import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import HabitDetail from "./pages/HabitDetail";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-habit" 
          element={
            <PrivateRoute>
              <AddHabit />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/habit/:id" 
          element={
            <PrivateRoute>
              <HabitDetail />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;