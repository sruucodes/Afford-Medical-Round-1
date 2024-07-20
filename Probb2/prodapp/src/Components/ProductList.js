import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Laptop');
  const [n, setN] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(category, { top: n, minPrice, maxPrice });
        setProducts(data.products);
      } catch (err) {
        setError('Error fetching products');
      }
    };

    loadProducts();
  }, [category, n, minPrice, maxPrice]);

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMinPrice(value < 0 ? 0 : value);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMaxPrice(value < 0 ? 0 : value);
  };

  const handleNumberOfProductsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setN(value < 1 ? 1 : value);
  };

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>{error}</p>}
      
      {/* Filters */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Phone">Phone</MenuItem>
          {/* Add other categories here */}
        </Select>
      </FormControl>
      <TextField
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Number of Products"
        type="number"
        value={n}
        onChange={handleNumberOfProductsChange}
        fullWidth
        margin="normal"
      />
      
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${category}/${product.id}`}>
              <h2>{product.productName}</h2>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>Availability: {product.availability}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
