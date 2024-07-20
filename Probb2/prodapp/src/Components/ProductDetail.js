import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../api';

const ProductDetail = () => {
  const { categoryname, productid } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const data = await fetchProductDetail(categoryname, productid);
        setProduct(data);
      } catch (err) {
        setError('Error fetching product detail');
      }
    };

    loadProductDetail();
  }, [categoryname, productid]);

  return (
    <div>
      {error && <p>{error}</p>}
      {product ? (
        <div>
          <h1>{product.productName}</h1>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}%</p>
          <p>Availability: {product.availability}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;