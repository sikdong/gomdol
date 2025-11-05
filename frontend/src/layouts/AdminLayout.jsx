import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 240px 1fr;
`;

const Sidebar = styled.aside`
  background: #101828;
  color: #fff;
  padding: 32px 24px;
`;

const NavItem = styled(Link)`
  display: block;
  color: inherit;
  margin-bottom: 16px;
  font-weight: 600;
`;

const Content = styled.main`
  padding: 32px;
  background: #f8fafc;
`;

const AdminLayout = () => (
  <Container>
    <Sidebar>
      <h2>Admin</h2>
      <nav>
        <NavItem to="/admin">Dashboard</NavItem>
        <NavItem to="/admin/products/new">Add Product</NavItem>
      </nav>
    </Sidebar>
    <Content>
      <Outlet />
    </Content>
  </Container>
);

export default AdminLayout;
