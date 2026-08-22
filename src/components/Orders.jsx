import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    fetch("http://localhost:5001/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>₹{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;