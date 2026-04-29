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
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
        navigate("/dashboard/user")
      }

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
          />

          <input
            name="password"
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            required
          />

          <button className="btn btn-success w-100 mb-3">Entrar</button>
        </form>

        <p className="text-center">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </>
  )
}

export default Login
