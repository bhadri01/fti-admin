// TokenManager.js

const tokenKey = "userToken";

const setTokenCookie = (token) => {
  const expiresIn = new Date(new Date().getTime() + 60 * 60 * 24 * 1000); // 1 day from now
  document.cookie = `${tokenKey}=${token}; expires=${expiresIn.toUTCString()}; path=/`;
};

const getTokenCookie = () => {
  const name = `${tokenKey}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const clearTokenCookie = () => {
  document.cookie = `${tokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  localStorage.clear();
};

export { setTokenCookie, getTokenCookie, clearTokenCookie };
