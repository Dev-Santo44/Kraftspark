import React, { useEffect, useState } from 'react';
import ProductCard from '../components/games/ProductCard';
import { useCart } from '../hooks/useCart';
// import dia from './../assets/images/mlbb.png';
import './../assets/styles/pages/Store.css';
import axios from 'axios';
// const sampleProducts = [
//   {
//     ID: 1,
//     post_title: 'Diamond Pack 100',
//     price: 4.99,
//     imageUrl: dia,
//   },
//   {
//     ID: 2,
//     post_title: 'Diamond Pack 300',
//     price: 9.99,
//     imageUrl: dia,
//   },
//   {
//     ID: 3,
//     post_title: 'Diamond Pack 500',
//     price: 14.99,
//     imageUrl: dia,
//   },
//   {
//     ID: 4,
//     post_title: 'Diamond Pack 1000',
//     price: 24.99,
//     imageUrl: dia,
//   },
// ];

const Store = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='store_section' >
    <div className='storeHead'>
      <h2>MLBB PRODUCT</h2>
    </div>
    <div className="store-container">
      {products.map(product => (
        <ProductCard key={product._id} product={product} addToCart={addToCart} />
      ))}

      </div>
    </div>
  );
};


export default Store;
