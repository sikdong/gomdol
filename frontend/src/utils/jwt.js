export const decodeJwt = (token) => {
  if (!token) {
    return null;
  }

  try {
    const segments = token.split('.');
    if (segments.length < 2) {
      return null;
    }
    const base64 = segments[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.warn('Failed to decode JWT payload', err);
    return null;
  }
};

export default decodeJwt;
