import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 }
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Enter product name and price");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: name,
      price: Number(price)
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="AddProduct" type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
