import React, { useState } from 'react';
import styled from 'styled-components';
import { login, oauthLogin } from '../api/auth';

const Container = styled.section`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
  background: ${(props) => props.$variant === 'secondary' ? '#0ea5e9' : '#2563eb'};
  color: #fff;
`;

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await login(form);
      window.localStorage.setItem('gomdol_jwt', response.token);
      window.location.href = '/';
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Login</Button>
      </form>
      <Button type="button" $variant="secondary" onClick={() => oauthLogin('google')}>
        Continue with Google
      </Button>
      <Button type="button" $variant="secondary" onClick={() => oauthLogin('kakao')}>
        Continue with Kakao
      </Button>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
    </Container>
  );
};

export default LoginPage;
