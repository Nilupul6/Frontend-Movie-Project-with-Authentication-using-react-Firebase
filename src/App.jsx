import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import { AuthContextPovider } from "./context/AuthContext"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Account from "./Pages/Account"
import ProtectedRoute from "./Components/ProtectedRoute"

const App = () => {
  return (
    <div>
      <AuthContextPovider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/account" element={
          <ProtectedRoute>
          <Account />
          </ProtectedRoute>
          }/>
        </Routes>
        </AuthContextPovider>
    </div>
    
    
  )
}

export default App