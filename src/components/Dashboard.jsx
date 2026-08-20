function Dashboard() {
  const totalOrders = 1;
  const totalProducts = 2;
  const totalRevenue = 50500;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div className="card">
          <h3>Total Products: {totalProducts}</h3>
        </div>

        <div className="card">
          <h3>Total Orders: {totalOrders}</h3>
          <p></p>
        </div>

        <div className="card">
          <h3>Total Revenue: ₹{totalRevenue}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;