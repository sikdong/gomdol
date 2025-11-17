import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { exchangeOauthCode } from '../../api/oauth';
import OAUTH_PROVIDERS, { consumeOauthState } from '../../config/oauthProviders';
import { AUTH_USER_UPDATED_EVENT } from '../../constants/auth';

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
    <section className="mx-auto mt-20 max-w-lg rounded-3xl bg-white px-8 py-12 text-center shadow-2xl">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
      <p className={`mt-6 text-base ${error ? 'text-rose-600' : 'text-slate-900'}`}>
        {error || `${OAUTH_PROVIDERS[provider]?.name || '소셜'} 로그인 처리 중입니다...`}
      </p>
      {error && (
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-6 rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
        >
          로그인 화면으로 이동
        </button>
      )}
    </section>
  );
};

export default OauthCallbackPage;
