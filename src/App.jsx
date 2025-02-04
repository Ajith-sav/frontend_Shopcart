import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useUser } from "./contexts/UserContext";
import { useEffect } from "react";
import Product from "./components/Product";
import Vendor from "./pages/Vendor";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("access");
  const { user } = useUser();

  if (!token) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <div className="main">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/auth" element={<Navigate to={"/"} />} />
          {user?.role != "vendor" ? (
            <>
              <Route path="/" element={<Navigate to={"/home"} />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/products" element={<Product editMode={false} />} /> */}
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to={"/vendor"} />} />
              <Route path="/home" element={<Navigate to={"/vendor"} />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route
                path="/product/:slug"
                element={<Product editMode={true} />}
              />
              <Route path="/product" element={<Product editMode={false} />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
