import { useState, useEffect } from "react"

function Home() {
  const products = [
    { id: 1, name: "Pala Bullpadel Vertex", price: "189 €" },
    { id: 2, name: "Pala Adidas Metalbone", price: "199 €" },
    { id: 3, name: "Pala Nox AT10", price: "179 €" },
    { id: 4, name: "Pala Head Speed", price: "169 €" }
  ]

  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(savedCart)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart([...cart, product])
    setOpen(true)
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Palas de Pádel</h1>

      <button className="btn btn-primary mb-3" onClick={() => setOpen(!open)}>
        {open ? "Cerrar Cistella" : `Abrir Cistella (${cart.length})`}
      </button>

      {open && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Cistella</h5>
            {cart.length === 0 && <p>La cistella està vacía</p>}
            <ul className="list-group list-group-flush">
              {cart.map((p, index) => (
                <li
                  key={p.id + "-" + index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {p.name} - {p.price}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>{p.price}</p>
                <button
                  className="btn btn-success w-100"
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
  )
}

export default Home
