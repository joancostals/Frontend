import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

// Pàgina mostrada quan l'usuari cancel·la el pagament a Stripe (Sessió 17)
function CheckoutCancel() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1 className="text-danger mb-4">Pago Cancelado</h1>
        <p className="lead">Has cancelado el proceso de pago. Puedes volver a intentarlo cuando quieras.</p>
        <Link to="/checkout" className="btn btn-warning mt-3 me-2">Volver al Checkout</Link>
        <Link to="/" className="btn btn-outline-secondary mt-3">Volver a la Tienda</Link>
      </div>
    </>
  );
}

export default CheckoutCancel;
