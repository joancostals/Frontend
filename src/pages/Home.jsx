import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";

// Imágenes
import bullpadel from "../assets/bullpadel_vertex.png";
import adidas from "../assets/adidas_metalbone.png";
import nox from "../assets/nox_at10.png";
import head from "../assets/head_speed.png";

function Home() {
  const products = [
    { id_pala: "bullpadel", name: "Pala Bullpadel Vertex", price: "189 €", img: bullpadel },
    { id_pala: "adidas", name: "Pala Adidas Metalbone", price: "199 €", img: adidas },
    { id_pala: "nox", name: "Pala Nox AT10", price: "179 €", img: nox },
    { id_pala: "head", name: "Pala Head Speed", price: "169 €", img: head }
  ];

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  // --- FUNCIONES CARRO ---
  const fetchCartFromBackend = async () => {
    try {
      const res = await apiFetch("/carritos");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (product) => {
    try {
      const precioNumerico = parseFloat(product.price.replace(" €", "").replace(".", ""));
      await apiFetch(`/carritos/add/${product.id_pala}`, {
        method: "POST",
        body: JSON.stringify({
          nombre: product.name,
          precio: precioNumerico
        })
      });
      await fetchCartFromBackend(); // refrescar carrito desde backend
      setOpen(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (product) => {
    try {
      await apiFetch(`/carritos/remove/${product.id_pala}`, {
        method: "DELETE"
      });
      await fetchCartFromBackend();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await apiFetch("/pedidos/checkout", {
        method: "POST"
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al realizar checkout");
      }

      alert("¡Compra realizada con éxito! Tu pedido ha sido registrado.");
      await fetchCartFromBackend(); // refrescamos (estará vacío)
      setOpen(false);
    } catch (err) {
      alert(err.message);
      console.error("Error en checkout:", err);
    }
  };

  // --- USE EFFECT PARA CARGAR CARRITO ---
  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  // --- RENDER ---
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mb-4 text-center">Palas de Pádel</h1>

        <button className="btn btn-primary mb-4" onClick={() => setOpen(!open)}>
          {open ? "Cerrar Carrito" : `Abrir Carrito (${cart.length})`}
        </button>

        {open && (
          <div className="card mb-4 p-3">
            <h5>Carrito</h5>
            {cart.length === 0 && <p>El carrito está vacío</p>}
            <ul className="list-group list-group-flush">
              {cart.map((p, index) => (
                <li
                  key={p.id_pala + "-" + index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {p.id_pala} - {p.cantidad}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(p)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            {cart.length > 0 && (
              <button className="btn btn-success mt-3" onClick={() => window.location.href = '/checkout'}>
                Finalizar Compra
              </button>
            )}
          </div>
        )}

        <div className="row">
          {products.map((p) => (
            <div key={p.id_pala} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm product-card">
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img-top p-3 product-img"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.price}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => addToCart(p)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;