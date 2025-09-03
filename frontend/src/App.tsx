import './App.css'
import Dashboard from './components/Dashboard';
import Signin from './components/Signin'
import Signup from './components/Signup'
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from './context/UserContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, loading } = useUser();
  console.log(user);


  if (loading) {
    <div className='w-screen h-screen flex flex-col gap-4 justify-center items-center font-text text-xl capitalize'>
      <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p>Loading...</p>
    </div>
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
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
    </>

  );
}

export default App;
