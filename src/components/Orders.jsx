function Orders() {
  const orders = [
    {
      id: 101,
      product: "Laptop",
      quantity: 2,
      total: 100000
    },
    {
      id: 102,
      product: "Mouse",
      quantity: 3,
      total: 1500
    }
  ];

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