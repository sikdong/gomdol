import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await apiClient.get('/admin/stats');
        setStats(data);
      } catch (err) {
        setStats({
          dailyVisitors: 0,
          dailySalesCount: 0,
          topProducts: [],
          dailyRevenue: {},
          monthlyRevenue: {}
        });
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return <p>Loading stats...</p>;
  }

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Daily Visitors</h3>
          <p className="mt-3 text-3xl font-bold text-slate-900">{stats.dailyVisitors}</p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Daily Sales</h3>
          <p className="mt-3 text-3xl font-bold text-slate-900">{stats.dailySalesCount}</p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-xl md:col-span-2 xl:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Top Products</h3>
          <ul className="mt-4 space-y-2 text-slate-700">
            {stats.topProducts.map((product) => (
              <li key={product.productId} className="rounded-lg bg-slate-50 px-3 py-2">
                {product.name} - {product.totalSold} sold
              </li>
            ))}
          </ul>
          {!stats.topProducts.length && <p className="mt-3 text-slate-500">No sales yet.</p>}
        </article>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
