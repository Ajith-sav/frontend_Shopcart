import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Product from "./components/Product";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  useEffect(() => {
    token ? navigate("/") : navigate("auth/");
  }, [token]);

  return (
    <div className="main">
      <Routes>
        <Route path="auth" element={<Auth />} exact />
        <Route path="/" element={<Home />} />
        <Route path="product/:slug" element={<Product editMode={true} />} />
        <Route path="product" element={<Product editMode={false} />} />
      </Routes>
    </div>
  );
}

export default App;
