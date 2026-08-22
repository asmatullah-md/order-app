import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Get products from MySQL through Express API
  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("product from API:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Enter product name and price");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: Number(price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to add product");
        return;
      }

      // Add newly created product to screen
      setProducts([...products, data]);

      setName("");
      setPrice("");

    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5001/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to delete product");
      return;
    }

    // Remove product from React screen
    setProducts(
      products.filter((product) => product.id !== id)
    );

  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Unable to connect to server");
  }
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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td><button className="delete" onClick={() =>
                deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;