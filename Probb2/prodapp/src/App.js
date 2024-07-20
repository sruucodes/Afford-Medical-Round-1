import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:categoryname/:productid" element={<ProductDetail />} />
    </Routes>
  );
};

export default App;