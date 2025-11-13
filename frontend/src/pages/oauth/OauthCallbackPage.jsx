import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { exchangeOauthCode } from '../../api/oauth';
import OAUTH_PROVIDERS, { consumeOauthState } from '../../config/oauthProviders';
import { AUTH_USER_UPDATED_EVENT } from '../../constants/auth';

const Wrapper = styled.section`
  max-width: 420px;
  margin: 80px auto;
  padding: 32px;
  text-align: center;
`;

const Status = styled.p`
  margin-top: 16px;
  color: ${(props) => props.$error ? '#dc2626' : '#0f172a'};
`;

const Spinner = styled.div`
  margin: 24px auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid #e0e7ff;
  border-top-color: #2563eb;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const OauthCallbackPage = () => {
  const { provider } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const processedCodeRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!provider || !OAUTH_PROVIDERS[provider]) {
      setError('지원하지 않는 OAuth 공급자입니다.');
      return;
    }

    if (!code) {
      setError('인가 코드가 존재하지 않습니다. 로그인 화면으로 돌아가십시오.');
      return;
    }

    const storedState = consumeOauthState(provider);
    if (storedState && state && storedState !== state) {
      setError('OAuth state 값이 일치하지 않습니다. 다시 시도해주세요.');
      return;
    }

    if (processedCodeRef.current === code) {
      return;
    }

    processedCodeRef.current = code;

    const run = async () => {
      try {
        await exchangeOauthCode(provider, code);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(AUTH_USER_UPDATED_EVENT));
        }
        navigate('/', { replace: true });
      } catch (err) {
        setError('소셜 로그인 처리 중 오류가 발생했습니다.');
        processedCodeRef.current = null;
      }
    };

    run();
  }, [provider, location.search, navigate]);

  return (
    <Wrapper>
      <Spinner />
      <Status $error={Boolean(error)}>
        {error || `${OAUTH_PROVIDERS[provider]?.name || '소셜'} 로그인 처리 중입니다...`}
      </Status>
      {error && (
        <button type="button" onClick={() => navigate('/login')}>
          로그인 화면으로 이동
        </button>
      )}
    </Wrapper>
  );
};

export default OauthCallbackPage;
