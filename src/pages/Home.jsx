function Home() {

  const products = [
    { id: 1, name: "Zapatillas deportivas", price: "59.99 €" },
    { id: 2, name: "Camiseta", price: "19.99 €" },
    { id: 3, name: "Reloj", price: "79.99 €" },
    { id: 4, name: "Sudadera", price: "39.99 €" },
  ]

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">Tienda Online</h1>

      <div className="row">

        {products.map(product => (
          <div key={product.id} className="col-md-3">

            <div className="card mb-4">
              <div className="card-body">

                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>

                <button className="btn btn-primary w-100">
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
