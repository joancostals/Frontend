function Register() {
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>

      <h2 className="text-center mb-4">Registro</h2>

      <form>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
          />
        </div>

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

        <button className="btn btn-primary w-100">
          Registrarse
        </button>

      </form>

    </div>
  )
}

export default Register
