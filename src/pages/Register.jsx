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
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registro</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <input
            name="nombre"
            type="text"
            className="form-control mb-3"
            placeholder="Nombre completo"
            required
          />

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

          <button className="btn btn-primary w-100 mb-3">Registrarse</button>
        </form>

        <p className="text-center">
          ¿Ya tienes cuenta? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  )
}

export default Register
