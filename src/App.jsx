import { useState } from "react";
import Login from "./components/Login";
import Products from "./components/Products";
import TakeOrder from "./components/TakeOrder";
import Orders from "./components/Orders";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <nav>
        <h1>Order Management</h1>

        <button className="navBar" onClick={() => setPage("products")}>
          Products
        </button>

        <button className="navBar" onClick={() => setPage("Take-order")}>
          Take Order
        </button>

        <button className="navBar" onClick={() => setPage("orders")}>
          Orders
        </button>

        <button className="navBar" onClick={() => setPage("dashboard")}>
          Dashboard
        </button>

        <button className="logout" onClick={() => setLoggedIn(false)}>
          Logout
        </button>
      </nav>
      

      <main>
        {page === "dashboard" && <Dashboard />}
        {page === "products" && <Products />}
        {page === "Take-order" && <TakeOrder />}
        {page === "orders" && <Orders />}
      </main>
    </div>
  );
}

export default App;
