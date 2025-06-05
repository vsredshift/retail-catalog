import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import ProductDetailView from "./pages/ProductDetailView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetailView />} />
    </Routes>
  );
}

export default App;
