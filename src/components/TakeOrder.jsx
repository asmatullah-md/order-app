import { useState } from "react";

function TakeOrder() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 }
  ];

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) {
      alert("Select a product");
      return;
    }

    const calculatedTotal = product.price * Number(quantity);

    setTotal(calculatedTotal);
  };

  return (
    <div>
      <h2>Take Order</h2>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
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
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button className="calTotal" onClick={calculateTotal}>
        Total Price
      </button>

      <h3>Total: ₹{total}</h3>

      <button className="PlaceOrder">Place Order</button>
    </div>
  );
}

export default TakeOrder;