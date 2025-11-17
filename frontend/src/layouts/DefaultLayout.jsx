import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
    <Header />
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default DefaultLayout;
