import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.article`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

const Image = styled.div`
  background: url(${(props) => props.$src}) center/cover no-repeat;
  height: 220px;
`;

const Body = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Price = styled.p`
  font-weight: 700;
  color: #1d4ed8;
`;

const ProductCard = ({ id, name, price, imageUrl, category }) => (
  <Link to={`/products/${id}`}>
    <Card>
      <Image $src={imageUrl || 'https://placehold.co/600x400?text=Vintage'} />
      <Body>
        <span>{category}</span>
        <Title>{name}</Title>
        <Price>₩ {price?.toLocaleString?.() || price}</Price>
      </Body>
    </Card>
  </Link>
);

export default ProductCard;
