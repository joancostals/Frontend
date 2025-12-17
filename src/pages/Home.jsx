function Home() {

  const products = [
    { id: 1, name: "Pala Bullpadel Vertex", price: "189 €" },
    { id: 2, name: "Pala Adidas Metalbone", price: "199 €" },
    { id: 3, name: "Pala Nox AT10", price: "179 €" },
    { id: 4, name: "Pala Head Speed", price: "169 €" }
  ]

  return (
    <div>
      <h1 className="mb-4">Palas de Pádel</h1>

      <div className="row">
        {products.map(p => (
          <div key={p.id} className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>{p.price}</p>
                <button className="btn btn-success w-100">
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
