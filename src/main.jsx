import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </UserProvider>
  </StrictMode>
);
