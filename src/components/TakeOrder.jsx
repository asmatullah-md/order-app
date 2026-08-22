import { useState, useEffect } from "react";

function TakeOrder() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const calculateTotal = () => {
    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) {
      alert("Select a product");
      return;
    }

    const calculatedTotal =
      Number(product.price) * Number(quantity);

    setTotal(calculatedTotal);
  };

  return (
    <div>
      <h2>Take Order</h2>

      <select
        value={productId}
        onChange={(e) => {
          setProductId(e.target.value);
          setTotal(0);
        }}
      >
        <option value="">Select Product</option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - ₹{product.price}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
          setTotal(0);
        }}
      />

      <button
        className="calTotal"
        onClick={calculateTotal}
      >
        Total Price
      </button>

      <h3>Total: ₹{total}</h3>

      <button
        className="PlaceOrder"
        onClick={() => {
          if (!productId) {
            alert("Select a product");
            return;
          }

          if (!quantity || quantity < 1) {
            alert("Enter a valid quantity");
            return;
          }

          fetch("http://localhost:5001/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              product_id: Number(productId),
              quantity: Number(quantity)
            })
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to place order");
              }

              return response.json();
            })
            .then((data) => {
              alert("Order placed successfully!");

              console.log("Order:", data);

              setProductId("");
              setQuantity(1);
              setTotal(0);
            })
            .catch((error) => {
              console.error("Error placing order:", error);
              alert("Failed to place order");
            });
        }}>
      Place Order
      </button>
    </div>
  );
}

export default TakeOrder;