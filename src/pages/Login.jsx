import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas")
      }

      // Guardar informacion en el localStorage
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("logged", "true")

      // Redirigir según el rol
      if (data.user.role === "admin") {
        navigate("/dashboard/admin")
      } else {
        navigate("/")
      }

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-5 shadow-lg border-0 w-100" style={{ maxWidth: "450px" }}>
          <h1 className="text-center mb-4 text-gradient fw-bold">Bienvenido</h1>
          <p className="text-center text-muted mb-4">Inicia sesión para continuar</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small text-muted">Correo Electrónico</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="tu@correo.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">Contraseña</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="********"
                required
              />
            </div>

            <button className="btn btn-primary w-100 btn-lg mb-3 py-2 fw-bold">Entrar</button>
          </form>

          <p className="text-center mt-3 mb-0">
            ¿No tienes cuenta? <Link to="/register" className="text-primary fw-bold text-decoration-none">Regístrate</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
