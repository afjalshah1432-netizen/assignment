import { Routes,Route } from "react-router-dom"
import Navbar from "./component/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function App() {
 

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dash" element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
