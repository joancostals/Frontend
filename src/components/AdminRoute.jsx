import { Navigate } from "react-router-dom"

function AdminRoute({ children }) {
  const logged = localStorage.getItem("logged") === "true"
  let isAdmin = false

  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.role === "admin") {
      isAdmin = true
    }
  } catch (e) {
    console.error("Error parsing user from localStorage", e)
  }

  if (!logged || !isAdmin) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute
