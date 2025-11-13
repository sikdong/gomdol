const OAUTH_PROVIDERS = {
  kakao: {
    name: 'Kakao',
    authorizeUrl: 'https://kauth.kakao.com/oauth/authorize',
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI || 'http://localhost:5173/oauth/kakao/callback',
    scope: 'profile_nickname'
  },
  google: {
    name: 'Google',
    authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173/oauth/google/callback',
    scope: 'openid profile email',
    extraParams: {
      access_type: 'offline',
      prompt: 'consent'
    }
  }
};

export const isProviderConfigured = (providerKey) => {
  const provider = OAUTH_PROVIDERS[providerKey];
  return Boolean(provider && provider.clientId && provider.redirectUri);
};

export const buildAuthorizeUrl = (providerKey, state) => {
  const provider = OAUTH_PROVIDERS[providerKey];
  if (!provider || !provider.clientId || !provider.redirectUri) {
    throw new Error(`OAuth provider ${providerKey} is not configured`);
  }

  const params = new URLSearchParams({
    client_id: provider.clientId,
    redirect_uri: provider.redirectUri,
    response_type: 'code'
  });

  if (provider.scope) {
    params.set('scope', provider.scope);
  }

  if (state) {
    params.set('state', state);
  }

  if (provider.extraParams) {
    Object.entries(provider.extraParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
  }

  return `${provider.authorizeUrl}?${params.toString()}`;
};

export const createOauthState = (providerKey) => {
  const hasWindow = typeof window !== 'undefined';
  const randomSource = hasWindow && window.crypto && window.crypto.randomUUID
    ? window.crypto.randomUUID()
    : Math.random().toString(36).slice(2);
  const state = `${providerKey}-${randomSource}`;
  if (hasWindow) {
    sessionStorage.setItem(`oauth_state_${providerKey}`, state);
  }
  return state;
};

export const consumeOauthState = (providerKey) => {
  if (typeof window === 'undefined') {
    return null;
  }
  const key = `oauth_state_${providerKey}`;
  const state = sessionStorage.getItem(key);
  sessionStorage.removeItem(key);
  return state;
};

export default OAUTH_PROVIDERS;
