function Login() {
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>

      <h2 className="text-center mb-4">Login</h2>

      <form>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
          />
        </div>

        <button className="btn btn-success w-100">
          Entrar
        </button>

      </form>

    </div>
  )
}

export default Login
