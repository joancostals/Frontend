import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { apiFetch } from "../utils/apiFetch.js";

function CheckoutSuccess() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finalizeOrder = async () => {
      const lastOrder = localStorage.getItem("lastOrderId");
      console.log("[DEBUG] CheckoutSuccess cargado. lastOrderId en localStorage:", lastOrder);

      if (lastOrder && lastOrder !== "undefined") {
        try {
          console.log(`[DEBUG] Intentando verificar pedido ${lastOrder}...`);
          const res = await apiFetch(`/pedidos/verify-payment/${lastOrder}`, {
            method: "POST"
          });

          if (res.ok) {
            console.log(`[DEBUG] Pedido ${lastOrder} verificado con éxito.`);
            localStorage.removeItem("lastOrderId");
          } else {
            const errData = await res.json();
            console.error(`[DEBUG] Error en verificación: ${errData.message}`);
          }
        } catch (err) {
          console.error("[DEBUG] Error de red finalizando pedido:", err);
        }
      } else {
        console.warn("[DEBUG] No se encontró lastOrderId válido para verificar.");
      }
      setLoading(false);
    };
    finalizeOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <div className="card p-5 shadow-lg border-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {loading ? (
            <div className="py-4">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <h2 className="text-gradient fw-bold">Finalizando tu compra...</h2>
              <p className="text-muted">Estamos procesando los últimos detalles de tu pedido.</p>
            </div>
          ) : (
            <>
              <div className="display-1 text-success mb-4">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h1 className="text-gradient fw-bold mb-4">¡Pago Completado!</h1>
              <p className="lead mb-4">Tu pedido se ha procesado con éxito. Ya puedes ver los detalles en tu perfil.</p>
              <div className="d-grid gap-2 d-md-block">
                <Link to="/" className="btn btn-primary px-5 me-md-2">Seguir Comprando</Link>
                <Link to="/dashboard/user" className="btn btn-outline-light px-5">Ver mis Pedidos</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckoutSuccess;
