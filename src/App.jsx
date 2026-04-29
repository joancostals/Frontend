import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Checkout from "./pages/Checkout.jsx"
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx"
import CheckoutCancel from "./pages/CheckoutCancel.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import AdminRoute from "./components/AdminRoute.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"

function App() {
  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Privada */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <CheckoutSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/cancel"
          element={
            <ProtectedRoute>
              <CheckoutCancel />
            </ProtectedRoute>
          }
        />
        
        {/* Dashboards */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
