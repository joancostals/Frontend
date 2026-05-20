import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

function Register() {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    const nombre = e.target.nombre.value
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      })


      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.message || "Error al registrar usuario")
      }

      alert("Usuario registrado correctamente")
      navigate("/login")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-5 shadow-lg border-0 w-100" style={{ maxWidth: "450px" }}>
          <h1 className="text-center mb-4 text-gradient fw-bold">Crea tu Cuenta</h1>
          <p className="text-center text-muted mb-4">Únete a la mejor comunidad de Pádel</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label small text-muted">Nombre Completo</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                placeholder="Juan Pérez"
                required
              />
            </div>

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

            <button className="btn btn-primary w-100 btn-lg mb-3 py-2 fw-bold">Registrarse</button>
          </form>

          <p className="text-center mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login" className="text-primary fw-bold text-decoration-none">Inicia Sesión</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
