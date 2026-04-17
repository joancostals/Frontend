import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

// Pàgina mostrada quan el pagament a Stripe és un èxit (Sessió 17)
function CheckoutSuccess() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1 className="text-success mb-4">¡Pago Completado!</h1>
        <p className="lead">Tu pedido se ha procesado con éxito. Recibirás un correo con los detalles.</p>
        <Link to="/" className="btn btn-primary mt-3">Volver a la Tienda</Link>
      </div>
    </>
  );
}

export default CheckoutSuccess;
