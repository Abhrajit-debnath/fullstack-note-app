import './App.css'
import Dashboard from './components/Dashboard';
import Signin from './components/Signin'
import Signup from './components/Signup'
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from './context/Usercontext';

function App() {
  const { user, loading } = useUser();
  console.log(user);
  

  if (loading) {
    return <div>Loading...</div>; // optional loading state
  }

  return (
    <Routes>
      {/* If user is logged in → show Dashboard, else redirect to Signup */}
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/signup" replace />}
      />

      {/* Auth routes */}
      <Route
        path="/signup"
        element={user ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Signin />}
      />
    </Routes>
  );
}

export default App;
