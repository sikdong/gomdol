import React, { useState } from 'react';
import styled from 'styled-components';
import { login } from '../api/auth';
import OAUTH_PROVIDERS, { buildAuthorizeUrl, createOauthState, isProviderConfigured } from '../config/oauthProviders';

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
  border: ${(props) => {
    if (props.$variant === 'google') {
      return '1px solid #d1d5db';
    }
    return 'none';
  }};
  font-weight: 600;
  margin-bottom: 12px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${(props) => {
    if (props.$variant === 'google') return '#fff';
    if (props.$variant === 'kakao') return '#FEE500';
    if (props.$variant === 'secondary') return '#0ea5e9';
    return '#2563eb';
  }};
  color: ${(props) => {
    if (props.$variant === 'google') return '#1f2937';
    if (props.$variant === 'kakao') return '#3C1E1E';
    return '#fff';
  }};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.2 0 3.1 2.7 1.2 7.3l3.5 2.7C5.7 7 8.6 4.8 12 4.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 5.9-1 7.8-2.7l-3.4-2.6c-.9.6-2.2 1-4.4 1-3.4 0-6.3-2.3-7.3-5.5H1.2v2.7C3.1 21.3 7.2 24 12 24z" />
    <path fill="#FBBC05" d="M4.7 14.2c-.2-.6-.3-1.2-.3-1.9 0-.6.1-1.3.3-1.9V7.7H1.2C.4 9.3 0 11.1 0 12.3s.4 3 1.2 4.6l3.5-2.7z" />
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.6h6.5c-.3 1.3-1.1 2.4-2.2 3.1l3.4 2.6c2-.1 3.8-2 3.8-4.6z" />
  </svg>
);

const KakaoLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <rect width="24" height="24" rx="12" fill="#3C1E1E" />
    <ellipse cx="12" cy="11" rx="8" ry="6" fill="#FEE500" />
    <path d="M8 15l-1.2 4L12 15.5 17.2 19 16 15" fill="#FEE500" />
    <ellipse cx="12" cy="11" rx="5.5" ry="4" fill="#3C1E1E" />
  </svg>
);

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
      await login(form);
      window.location.href = '/';
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleOauthClick = (providerKey) => {
    setError('');
    if (!isProviderConfigured(providerKey)) {
      const providerName = OAUTH_PROVIDERS[providerKey]?.name || providerKey;
      setError(`${providerName} OAuth 설정이 비어 있습니다. 환경 변수를 확인하세요.`);
      return;
    }
    const state = createOauthState(providerKey);
    const url = buildAuthorizeUrl(providerKey, state);
    window.location.href = url;
  };

  const googleReady = isProviderConfigured('google');
  const kakaoReady = isProviderConfigured('kakao');

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
      <Button type="button" $variant="google" disabled={!googleReady} onClick={() => handleOauthClick('google')}>
        <ButtonContent>
          <IconWrapper>
            <GoogleLogo />
          </IconWrapper>
          <span>구글 로그인 하기</span>
        </ButtonContent>
      </Button>
      <Button type="button" $variant="kakao" disabled={!kakaoReady} onClick={() => handleOauthClick('kakao')}>
        <ButtonContent>
          <IconWrapper>
            <KakaoLogo />
          </IconWrapper>
          <span>카카오 로그인 하기</span>
        </ButtonContent>
      </Button>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
    </Container>
  );
};

export default LoginPage;
