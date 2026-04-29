import { useState, useEffect } from "react"
import Navbar from "../components/Navbar.jsx"
import { useNavigate } from "react-router-dom"

function UserDashboard() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    if (!user.id_usuario) {
      navigate("/login")
      return
    }

    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const response = await fetch(`http://localhost:5000/api/pedidos/usuario/${user.id_usuario}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || "Error al carregar comandes")
        }

        setPedidos(data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPedidos()
  }, [user.id_usuario, navigate])

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Dashboard d'Usuari</h2>
        <div className="card mb-4 mt-3">
          <div className="card-body">
            <h5 className="card-title">Dades del Perfil</h5>
            <p className="card-text"><strong>Nom:</strong> {user.nombre}</p>
            <p className="card-text"><strong>Email:</strong> {user.email}</p>
            <p className="card-text"><strong>Rol:</strong> <span className="badge bg-primary">{user.role}</span></p>
          </div>
        </div>

        <h4>Les meves comandes</h4>
        {loading ? (
          <p>Carregant comandes...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : pedidos.length === 0 ? (
          <p>Encara no has fet cap comanda.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID Comanda</th>
                  <th>Data</th>
                  <th>Estat</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id_pedido}>
                    <td>{pedido.id_pedido}</td>
                    <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${pedido.estado === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td>{pedido.total.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default UserDashboard
