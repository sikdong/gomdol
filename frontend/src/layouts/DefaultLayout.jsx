import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = () => (
  <>
    <Header />
    <main style={{ padding: '24px', minHeight: '80vh' }}>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default DefaultLayout;
