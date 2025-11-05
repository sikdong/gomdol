import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 16px;
`;

const Header = () => (
  <Container>
    <Link to="/">Gomdol Vintage</Link>
    <NavLinks>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/login">Login</Link>
    </NavLinks>
  </Container>
);

export default Header;
