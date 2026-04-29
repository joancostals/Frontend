import { useState, useEffect } from "react"
import Navbar from "../components/Navbar.jsx"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js"
import { Bar, Pie, Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const headers = { "Authorization": `Bearer ${token}` }

        const [resUsers, resPedidos] = await Promise.all([
          fetch("http://localhost:5000/api/users", { headers }),
          fetch("http://localhost:5000/api/pedidos", { headers })
        ])

        const dataUsers = await resUsers.json()
        const dataPedidos = await resPedidos.json()

        setUsers(dataUsers || [])
        setPedidos(dataPedidos.data || [])
      } catch (err) {
        console.error("Error fetching admin data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // --- CÀLCULS DE MÈTRIQUES ---
  
  // 1. Ingressos Totals (Considerem pagats, completats o finalitzats)
  const paidOrders = pedidos.filter(p => 
    ["paid", "completado", "finalizado", "enviado", "entregado"].includes(p.estado?.toLowerCase())
  )
  const totalRevenue = paidOrders.reduce((sum, p) => sum + (Number(p.total) || 0), 0)
  
  // 2. Tiquet Mitjà
  const averageOrder = paidOrders.length > 0 ? (totalRevenue / paidOrders.length) : 0

  // 3. Gràfic de Tendència (Vendes per dia)
  const salesByDate = paidOrders.reduce((acc, p) => {
    const date = new Date(p.fecha).toLocaleDateString()
    acc[date] = (acc[date] || 0) + p.total
    return acc
  }, {})

  const lineData = {
    labels: Object.keys(salesByDate),
    datasets: [
      {
        label: "Ingressos (€)",
        data: Object.values(salesByDate),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)"
      }
    ]
  }

  // 4. Top Productes Més Venuts
  const productSales = {}
  pedidos.forEach(p => {
    p.items.forEach(item => {
      productSales[item.nombre] = (productSales[item.nombre] || 0) + item.cantidad
    })
  })

  const topProductsData = {
    labels: Object.keys(productSales).slice(0, 5),
    datasets: [
      {
        label: "Unitats Venudes",
        data: Object.values(productSales).slice(0, 5),
        backgroundColor: [
          "#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"
        ]
      }
    ]
  }

  // 5. Estat de les Comandes (Pie)
  const statusCounts = pedidos.reduce((acc, p) => {
    acc[p.estado] = (acc[p.estado] || 0) + 1
    return acc
  }, {})

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#f6c23e", "#1cc88a", "#4e73df", "#858796", "#e74a3b"]
      }
    ]
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4 pb-5">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800 fw-bold">Panell de Control d'Administració</h1>
          <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={() => window.print()}>
            Generar Informe
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Carregant dades del sistema...</p>
          </div>
        ) : (
          <>
            {/* KPI CARDS */}
            <div className="row">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-start border-primary border-4 shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Ingressos Totals</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{totalRevenue.toLocaleString()} €</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-start border-success border-4 shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Comandes Totals</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{pedidos.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-start border-info border-4 shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tiquet Mitjà</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{averageOrder.toFixed(2)} €</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-start border-warning border-4 shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Usuaris Registrats</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{users.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHARTS ROW 1 */}
            <div className="row">
              <div className="col-lg-8 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Evolució de Vendes</h6>
                  </div>
                  <div className="card-body">
                    <div style={{ height: "300px" }}>
                      <Line data={lineData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Estat de Comandes</h6>
                  </div>
                  <div className="card-body">
                    <div style={{ height: "300px" }}>
                      <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHARTS ROW 2 */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Top 5 Productes Més Venuts</h6>
                  </div>
                  <div className="card-body">
                    <div style={{ height: "300px" }}>
                      <Bar data={topProductsData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Últims Usuaris</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm align-middle">
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rol</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.slice(-5).reverse().map(u => (
                            <tr key={u.id_usuario}>
                              <td>{u.nombre}</td>
                              <td>{u.email}</td>
                              <td>
                                <span className={`badge rounded-pill ${u.role === 'admin' ? 'bg-danger' : 'bg-light text-dark border'}`}>
                                  {u.role}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminDashboard
