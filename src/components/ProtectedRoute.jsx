import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const logged = localStorage.getItem("logged") === "true"

  if (!logged) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
