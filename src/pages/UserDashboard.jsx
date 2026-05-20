import { useState, useEffect } from "react"
import Navbar from "../components/Navbar.jsx"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../utils/apiFetch.js"

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
        const response = await apiFetch(`/pedidos/usuario/${user.id_usuario}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Error al cargar pedidos")
        }

        const allPedidos = data.data || [];
        // Filtrar solo los pagados
        const pedidosFinalizados = allPedidos.filter(p =>
          p.estado === 'finalizada' ||
          p.estado === 'completado' ||
          p.estado === 'paid'
        );
        setPedidos(pedidosFinalizados);
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
      <div className="container mt-5 mb-5">
        <h1 className="text-gradient fw-bold mb-4">Mi Perfil</h1>

        <div className="row g-4">
          {/* Perfil */}
          <div className="col-md-4">
            <div className="card p-4 shadow-lg border-0 h-100">
              <div className="text-center mb-3">
                <div className="bg-primary rounded-circle d-inline-block p-3 mb-3">
                  <i className="bi bi-person-fill fs-1 text-white"></i>
                </div>
                <h4 className="fw-bold">{user.nombre}</h4>
                <span className="badge bg-primary-soft text-primary px-3 py-2">{user.role}</span>
              </div>
              <hr className="my-4 opacity-10" />
              <div className="small text-muted mb-1">Correo Electrónico</div>
              <div className="fw-medium mb-3">{user.email}</div>
            </div>
          </div>

          {/* Pedidos */}
          <div className="col-md-8">
            <div className="card p-4 shadow-lg border-0 h-100">
              <h4 className="fw-bold mb-4">Mis Compras Realizadas</h4>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : pedidos.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-bag-x fs-1 text-muted mb-3 d-block"></i>
                  <p className="text-muted">No tienes compras finalizadas todavía.</p>
                  <button onClick={() => navigate("/")} className="btn btn-primary">Ir a la tienda</button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle custom-table">
                    <thead>
                      <tr>
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidos.map(pedido => (
                        <tr key={pedido.id_pedido}>
                          <td className="font-monospace small">{pedido.id_pedido.substring(0, 8)}...</td>
                          <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                          <td>
                            <span className="badge bg-success-soft text-success px-3 py-2">
                              Pago Exitoso
                            </span>
                          </td>
                          <td className="text-end fw-bold">{pedido.total.toFixed(2)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard
