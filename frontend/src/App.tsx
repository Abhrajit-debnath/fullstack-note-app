
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Signin/>}/>
      </Routes>
  )
}

export default App
