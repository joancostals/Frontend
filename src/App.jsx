import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-success px-3">
        <span className="navbar-brand">Padel Store</span>

        <button
          className="btn btn-outline-light ms-auto"
          onClick={() => {
            localStorage.removeItem("logged")
            window.location.href = "/login"
          }}
        >
          Logout
        </button>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  )
}

export default App
