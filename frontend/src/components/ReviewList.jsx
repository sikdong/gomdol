import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  margin-top: 32px;
`;

const ReviewItem = styled.article`
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 16px;
  background: #fff;
`;

const Rating = styled.div`
  font-weight: 700;
  color: #fbbf24;
`;

const ReviewList = ({ reviews = [] }) => (
  <Container>
    <h3>Reviews ({reviews.length})</h3>
    {reviews.map((review) => (
      <ReviewItem key={review.id}>
        <Rating>{'★'.repeat(review.rating)}</Rating>
        <p>{review.content}</p>
        <small>by {review.username}</small>
      </ReviewItem>
    ))}
    {!reviews.length && <p>No reviews yet. Be the first!</p>}
  </Container>
);

export default ReviewList;
