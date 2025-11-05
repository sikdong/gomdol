import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProductById } from '../api/products';
import { fetchReviews } from '../api/reviews';
import ReviewList from '../components/ReviewList';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const ProductHero = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
`;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setProduct({
          id: Number(productId),
          name: 'Sample Vintage Item',
          category: 'Outerwear',
          price: 99000,
          description: 'Description placeholder while API is wired up.'
        });
      }
    };

    const loadReviews = async () => {
      try {
        const data = await fetchReviews(productId);
        setReviews(data);
      } catch (err) {
        setReviews([]);
      }
    };

    loadProduct();
    loadReviews();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Container>
        <ProductHero>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₩ {product.price?.toLocaleString?.() || product.price}</p>
        </ProductHero>
      </Container>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ProductDetailPage;
