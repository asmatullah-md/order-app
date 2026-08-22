import { useState, useEffect } from "react";

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Get products
    fetch("http://localhost:5001/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setTotalProducts(data.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Get orders
    fetch("http://localhost:5001/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();
      })
      .then((data) => {
        setTotalOrders(data.length);

        const revenue = data.reduce(
          (sum, order) => sum + Number(order.total),
          0
        );

        setTotalRevenue(revenue);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div className="card">
          <h3>Total Products: {totalProducts}</h3>
        </div>

        <div className="card">
          <h3>Total Orders: {totalOrders}</h3>
        </div>

        <div className="card">
          <h3>Total Revenue: ₹{totalRevenue}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;