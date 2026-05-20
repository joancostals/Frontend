import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { apiFetch } from "../utils/apiFetch.js";

// Imágenes
import bullpadel from "../assets/bullpadel_vertex.png";
import adidas from "../assets/adidas_metalbone.png";
import nox from "../assets/nox_at10.png";
import head from "../assets/head_speed.png";
import img1 from "../assets/Adidas Cross It Team Control 2026.png";
import img2 from "../assets/Babolat Air Vertuo 2.6 2026.png";
import img3 from "../assets/Babolat Counter Origin 2025.png";
import img4 from "../assets/Babolat Technical Vertuo Juan Lebrón 2.5 2025.png";
import img5 from "../assets/Bullpadel Ionic Power 2026.png";
import img6 from "../assets/Enebe RS 9.1 azul 2023.png";
import img7 from "../assets/Head Coello Team 2026.png";
import img8 from "../assets/Head Radical Motion 26.png";
import img9 from "../assets/Head Speed Junior 2025.png";
import img10 from "../assets/Joma Valkiria Pro HRD negro gris 2026.png";
import img11 from "../assets/Kuikma Hybrid Pro Coki Nieto.png";
import img12 from "../assets/Kuikma PR Hybrid Carbon Coki Nieto.png";
import img13 from "../assets/Nox Equation Hard Advanced 2026.png";
import img14 from "../assets/Pala de pádel Bullpadel Vertex.png";
import img15 from "../assets/Royal Padel Factor 2026.png";
import img16 from "../assets/Tecnifibre Wall Breaker 355.png";
import img17 from "../assets/Wilson Bela v3.png";
import img18 from "../assets/adidas Cross IT Carbon 2026.png";

function Home() {
  const allProducts = [
    { id_pala: "bullpadel-vertex-2", name: "Pala Bullpadel Vertex 2", price: "189 €", priceNumerico: 189, img: bullpadel, quality: "alta", type: "ataque" },
    { id_pala: "adidas-metalbone", name: "Pala Adidas Metalbone", price: "199 €", priceNumerico: 199, img: adidas, quality: "alta", type: "ataque" },
    { id_pala: "nox-at10", name: "Pala Nox AT10", price: "179 €", priceNumerico: 179, img: nox, quality: "alta", type: "control" },
    { id_pala: "head-speed", name: "Pala Head Speed", price: "169 €", priceNumerico: 169, img: head, quality: "alta", type: "control" },
    { id_pala: "adidas-cross-it-team", name: "Adidas Cross It Team Control 2026", price: "150 €", priceNumerico: 150, img: img1, quality: "alta", type: "control" },
    { id_pala: "babolat-air-vertuo", name: "Babolat Air Vertuo 2.6 2026", price: "140 €", priceNumerico: 140, img: img2, quality: "media", type: "ataque" },
    { id_pala: "babolat-counter-origin", name: "Babolat Counter Origin 2025", price: "120 €", priceNumerico: 120, img: img3, quality: "media", type: "control" },
    { id_pala: "babolat-technical-lebron", name: "Babolat Technical Vertuo Juan Lebrón 2.5", price: "160 €", priceNumerico: 160, img: img4, quality: "alta", type: "ataque" },
    { id_pala: "bullpadel-ionic-power", name: "Bullpadel Ionic Power 2026", price: "110 €", priceNumerico: 110, img: img5, quality: "media", type: "ataque" },
    { id_pala: "enebe-rs-9-1", name: "Enebe RS 9.1 Azul", price: "80 €", priceNumerico: 80, img: img6, quality: "baja", type: "control" },
    { id_pala: "head-coello-team", name: "Head Coello Team 2026", price: "170 €", priceNumerico: 170, img: img7, quality: "alta", type: "ataque" },
    { id_pala: "head-radical-motion", name: "Head Radical Motion 2026", price: "145 €", priceNumerico: 145, img: img8, quality: "alta", type: "control" },
    { id_pala: "head-speed-junior", name: "Head Speed Junior 2025", price: "60 €", priceNumerico: 60, img: img9, quality: "baja", type: "control" },
    { id_pala: "joma-valkiria-pro", name: "Joma Valkiria Pro HRD", price: "90 €", priceNumerico: 90, img: img10, quality: "baja", type: "ataque" },
    { id_pala: "kuikma-hybrid-pro", name: "Kuikma Hybrid Pro Coki Nieto", price: "100 €", priceNumerico: 100, img: img11, quality: "media", type: "ataque" },
    { id_pala: "kuikma-pr-hybrid", name: "Kuikma PR Hybrid Carbon", price: "100 €", priceNumerico: 100, img: img12, quality: "media", type: "control" },
    { id_pala: "nox-equation-hard", name: "Nox Equation Hard Advanced 2026", price: "130 €", priceNumerico: 130, img: img13, quality: "media", type: "ataque" },
    { id_pala: "bullpadel-vertex-3", name: "Bullpadel Vertex 3", price: "189 €", priceNumerico: 189, img: img14, quality: "alta", type: "ataque" },
    { id_pala: "royal-padel-factor", name: "Royal Padel Factor 2026", price: "110 €", priceNumerico: 110, img: img15, quality: "media", type: "control" },
    { id_pala: "tecnifibre-wall-breaker", name: "Tecnifibre Wall Breaker 355", price: "125 €", priceNumerico: 125, img: img16, quality: "media", type: "ataque" },
    { id_pala: "wilson-bela-v3", name: "Wilson Bela v3", price: "200 €", priceNumerico: 200, img: img17, quality: "alta", type: "ataque" },
    { id_pala: "adidas-cross-it-carbon", name: "Adidas Cross IT Carbon 2026", price: "190 €", priceNumerico: 190, img: img18, quality: "alta", type: "ataque" }
  ];

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  // States for filters
  const [searchName, setSearchName] = useState("");
  const [filterQuality, setFilterQuality] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  const filteredProducts = allProducts.filter(p => {
    const matchName = p.name.toLowerCase().includes(searchName.toLowerCase());
    const matchQuality = filterQuality ? p.quality === filterQuality : true;
    const matchType = filterType ? p.type === filterType : true;
    const matchMinPrice = filterMinPrice ? p.priceNumerico >= parseFloat(filterMinPrice) : true;
    const matchMaxPrice = filterMaxPrice ? p.priceNumerico <= parseFloat(filterMaxPrice) : true;

    return matchName && matchQuality && matchType && matchMinPrice && matchMaxPrice;
  });


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
      const res = await apiFetch(`/carritos/add/${product.id_pala}`, {
        method: "POST",
        body: JSON.stringify({
          nombre: product.name,
          precio: precioNumerico
        })
      });
      if (!res.ok) {
        const errData = await res.text();
        console.error("Error backend adding to cart:", errData);
        alert("Error backend: " + errData);
        return;
      }
      await fetchCartFromBackend(); // refrescar carrito desde backend
      setOpen(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Excepción de JS agregando producto: " + err.message);
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
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
          <h1 className="text-gradient fw-bolder mb-0">Palas de Pádel Premium</h1>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setOpen(!open)}>
            <i className="bi bi-cart"></i>
            {open ? "Cerrar Carrito" : `Carrito (${cart.length})`}
          </button>
        </div>

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

        {/* Filters */}
        <div className="card mb-4 p-3 shadow-sm">
          <h5 className="mb-3">Filtros</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select className="form-select" value={filterQuality} onChange={(e) => setFilterQuality(e.target.value)}>
                <option value="">Calidad (Todas)</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">Tipo (Todos)</option>
                <option value="ataque">Ataque</option>
                <option value="control">Control</option>
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Precio Mínimo"
                value={filterMinPrice}
                onChange={(e) => setFilterMinPrice(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Precio Máximo"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <button className="btn btn-outline-secondary w-100" onClick={() => {
                setSearchName("");
                setFilterQuality("");
                setFilterType("");
                setFilterMinPrice("");
                setFilterMaxPrice("");
              }}>Limpiar</button>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredProducts.length === 0 ? (
            <div className="col-12 text-center my-5">
              <h4>No se han encontrado resultados.</h4>
              <p>Intenta ajustar los filtros de búsqueda.</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div key={p.id_pala} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm product-card">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="card-img-top p-3 product-img"
                    style={{ objectFit: 'contain', height: '250px' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">{p.name}</h5>
                    <p className="card-text mb-2 fw-bold fs-4 text-primary">{p.price}</p>
                    <div className="mt-auto">
                      <p className="card-text mb-1"><small>Calidad: <span className="text-white">{p.quality.charAt(0).toUpperCase() + p.quality.slice(1)}</span></small></p>
                      <p className="card-text mb-3"><small>Tipo: <span className="text-white">{p.type.charAt(0).toUpperCase() + p.type.slice(1)}</span></small></p>
                    </div>
                    <button
                      className="btn btn-success mt-auto"
                      onClick={() => addToCart(p)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;