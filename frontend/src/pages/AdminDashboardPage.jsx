import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import apiClient from '../api/client';

const Grid = styled.section`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Card = styled.article`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
`;

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
    <section>
      <h1>Admin Dashboard</h1>
      <Grid>
        <Card>
          <h3>Daily Visitors</h3>
          <p>{stats.dailyVisitors}</p>
        </Card>
        <Card>
          <h3>Daily Sales</h3>
          <p>{stats.dailySalesCount}</p>
        </Card>
        <Card>
          <h3>Top Products</h3>
          <ul>
            {stats.topProducts.map((product) => (
              <li key={product.productId}>
                {product.name} - {product.totalSold} sold
              </li>
            ))}
          </ul>
          {!stats.topProducts.length && <p>No sales yet.</p>}
        </Card>
      </Grid>
    </section>
  );
};

export default AdminDashboardPage;
