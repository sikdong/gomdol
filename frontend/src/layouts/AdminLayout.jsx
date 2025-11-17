import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => (
  <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
    <aside className="bg-slate-900 px-6 py-10 text-white">
      <h2 className="mb-6 text-2xl font-bold">Admin</h2>
      <nav className="space-y-4 text-sm font-semibold text-slate-100">
        <Link to="/admin" className="block transition hover:text-amber-300">
          Dashboard
        </Link>
        <Link to="/admin/products/new" className="block transition hover:text-amber-300">
          Add Product
        </Link>
      </nav>
    </aside>
    <main className="bg-slate-50 px-6 py-10">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
