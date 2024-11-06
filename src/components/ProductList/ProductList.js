import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cartSlice';
import Filter from '../Filter/Filter';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading } = useProducts();
  const [filteredCategory, setFilteredCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      let filtered = products;

      if (filteredCategory !== 'All') {
        filtered = filtered.filter(
          product => product?.category === filteredCategory
        );
      }

      if (searchQuery) {
        filtered = filtered.filter(product =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [products, filteredCategory, searchQuery]);

  const addToCart = (product) => {
    dispatch(cartActions.addItem(product));
  };

  const handleSearchResults = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="product-list">
      <Filter
        setFilteredCategory={setFilteredCategory}
        onSearchResults={handleSearchResults}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filteredProducts?.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
