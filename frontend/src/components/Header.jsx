import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuthUser from '../hooks/useAuthUser';

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
  align-items: center;
`;

const UserBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  background: #eef2ff;
  color: #312e81;
  font-weight: 600;
`;

const Header = () => {
  const authUser = useAuthUser();
  console.log("authUser === " , authUser);

  return (
    <Container>
      <Link to="/">Gomdol Vintage</Link>
      <NavLinks>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        {authUser ? (
          <UserBadge>{authUser.nickname}님</UserBadge>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </NavLinks>
    </Container>
  );
};

export default Header;
