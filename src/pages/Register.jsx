import { Link } from "react-router-dom"

function Register() {

  const handleRegister = (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    localStorage.setItem(
      "user",
      JSON.stringify({ email, password })
    )

    alert("Usuario registrado correctamente")
    window.location.href = "/login"
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Registro</h2>

      <form onSubmit={handleRegister}>
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

        <button className="btn btn-primary w-100 mb-3">
          Registrarse
        </button>
      </form>

      <p className="text-center">
        ¿Ya tienes cuenta? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
