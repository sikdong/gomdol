import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

const Hero = styled.section`
  padding: 80px 24px 40px;
  background: radial-gradient(circle at top, #fbbf24, #f97316);
  border-radius: 24px;
  color: #1f2937;
  margin-bottom: 40px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setProducts([
          {
            id: 1,
            name: 'Vintage Denim Jacket',
            category: 'Outerwear',
            price: 129000,
            imageUrl: ''
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Hero>
        <h1>Curated Vintage Pieces</h1>
        <p>Discover rare finds and timeless garments handpicked for you.</p>
      </Hero>
      {loading ? <p>Loading products...</p> : (
        <Grid>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default HomePage;
