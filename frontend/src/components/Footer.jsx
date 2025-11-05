import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  margin-top: auto;
  padding: 24px;
  text-align: center;
  background: #0f172a;
  color: #e2e8f0;
`;

const Footer = () => (
  <Container>
    © {new Date().getFullYear()} Gomdol Vintage Shop. All rights reserved.
  </Container>
);

export default Footer;
