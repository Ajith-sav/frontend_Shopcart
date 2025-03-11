import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useUser } from "./contexts/UserContext";
import Product from "./components/vendor/Product";
import Vendor from "./pages/Vendor";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ProductDetails from "./components/customer/ProductDetails";
import ErrorBoundary from "./components/error/ErrorBoundary ";
import Navbar from "./components/common/Navbar";
import { useProduct } from "./contexts/ProductContext";
import BannerUpload from "./components/banner/BannerUpload";

function App() {
  const token = localStorage.getItem("access");
  const { user } = useUser();
  const { searchAction } = useProduct();

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
      <Navbar onSearch={searchAction} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/auth" element={<Navigate to={"/"} />} />
          <Route
            path="/product/:slug"
            element={
              user?.role == "customer" ? (
                <ErrorBoundary>
                  <ProductDetails />
                </ErrorBoundary>
              ) : (
                <Product editMode={true} />
              )
            }
          />
          {user?.role == "customer" ? (
            <>
              <Route path="/" element={<Navigate to={"/home"} />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/product/:slug" element={<ProductDetails />} /> */}
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to={"/vendor"} />} />
              <Route path="/home" element={<Navigate to={"/vendor"} />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/banner" element={<BannerUpload />} />
              {/* <Route
                path="/product/:slug"
                element={<Product editMode={true} />}
              /> */}
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
