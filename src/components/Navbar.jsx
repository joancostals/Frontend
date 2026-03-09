import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const logged = localStorage.getItem("logged") === "true"

  const handleLogout = () => {
    localStorage.removeItem("logged")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Pádel Store</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!logged ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
