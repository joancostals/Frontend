import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const logged = localStorage.getItem("logged") === "true"
  
  let user = null
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}")
  } catch (e) {
    user = null
  }

  const handleLogout = () => {
    localStorage.removeItem("logged")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Pádel Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {!logged ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-success ms-lg-2" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  {user?.role === 'admin' ? (
                    <Link className="nav-link text-warning fw-bold" to="/dashboard/admin">Dashboard Admin</Link>
                  ) : (
                    <Link className="nav-link text-info fw-bold" to="/dashboard/user">El meu Perfil</Link>
                  )}
                </li>
                <li className="nav-item ms-lg-3">
                  <span className="navbar-text text-white me-3 d-none d-lg-inline">
                    Hola, <strong>{user?.nombre}</strong>
                  </span>
                  <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
