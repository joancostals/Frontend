import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import { apiFetch } from "../utils/apiFetch.js"

function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  // Campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    apellidos: "",
    correo: "",
    direccion: ""
  })

  useEffect(() => {
    fetchCartFromBackend()
  }, [])

  const fetchCartFromBackend = async () => {
    try {
      const res = await apiFetch("/carritos")
      const data = await res.json()
      
      const items = data.items || []
      setCart(items)
      
      const sum = items.reduce((acc, current) => acc + (current.precio * current.cantidad), 0)
      setTotal(sum)
      
      if (items.length === 0) {
          alert("Tu carrito está vacío. Redirigiendo a la tienda...")
          navigate("/")
      }
    } catch (err) {
      console.error("Error fetching cart:", err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()

    try {
      // 1. Cridar a l'API per crear la comanda amb estat pending
      const resPedido = await apiFetch("/pedidos/checkout", {
        method: "POST",
        body: JSON.stringify({ detallesEnvio: formData })
      })

      if (!resPedido.ok) {
        const errorData = await resPedido.json()
        throw new Error(errorData.message || "Error al realizar checkout")
      }

      const pedidoData = await resPedido.json();
      const orderId = pedidoData.data.id_pedido;

      // 2. Cridar a la nostra API integrant Stripe per crear la sessió
      const resSession = await apiFetch("/checkout/create-session", {
        method: "POST",
        body: JSON.stringify({ orderId, products: cart })
      });

      if (!resSession.ok) {
         let errText = "Error en el backend al generar pago";
         try {
             const data = await resSession.json();
             errText = data.message;
         } catch { }
         throw new Error("Stripe Error: " + errText);
      }

      const sessionData = await resSession.json();

      // 3. Redirigir l'usuari a la url de la sessió retornada per Stripe
      // Nota: stripe.redirectToCheckout ya no tiene soporte en nuevas versiones, 
      // la mejor práctica es redirigir al checkout url dado por la API
      if (sessionData.url) {
        window.location.href = sessionData.url;
      } else {
        throw new Error("No se ha recibido una URL válida de pago");
      }

    } catch (err) {
      alert(err.message)
      console.error("Error processando pago:", err)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Finalizar Compra</h2>
        
        <div className="row">
          {/* Resumen Carrito */}
          <div className="col-md-5 mb-4 order-md-2">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Resumen de tu Pedido</h4>
              <ul className="list-group list-group-flush mb-3">
                {cart.map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.nombre}</h6>
                      <small className="text-muted">Cantidad: {item.cantidad}</small>
                    </div>
                    <span className="text-muted">{item.precio * item.cantidad} €</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mt-3">
                <span className="fw-bold">Total (EUR)</span>
                <strong className="fs-5">{total} €</strong>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-md-7 px-md-4 order-md-1 bg-dark text-white p-4 rounded shadow-sm">
            <h4 className="mb-3">Datos de Envío y Pago</h4>
            <form onSubmit={handleCheckoutSubmit} className="needs-validation">
                
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="apellidos" className="form-label">Apellidos</label>
                  <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" name="correo" placeholder="correo@ejemplo.com" value={formData.correo} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label htmlFor="direccion" className="form-label">Dirección Completa de Envío</label>
                <input type="text" className="form-control" name="direccion" placeholder="Calle, Número, Ciudad, CP" value={formData.direccion} onChange={handleChange} required />
              </div>

              <button className="w-100 btn btn-success btn-lg mt-4 fw-bold" type="submit">
                Confirmar pedido e ir a Pagar a Stripe
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
