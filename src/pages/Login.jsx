import { Link, useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const user = JSON.parse(localStorage.getItem("user"))

    if (!user || user.email !== email || user.password !== password) {
      alert("Credenciales incorrectas")
      return
    }

    localStorage.setItem("logged", "true")
    navigate("/")
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>

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

        <button className="btn btn-success w-100 mb-3">
          Entrar
        </button>
      </form>

      <p className="text-center">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  )
}

export default Login
