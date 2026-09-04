const AUTH_KEY = 'auth';

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  } catch {
    return null;
  }
}

export function setAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem('LoginObj');
  localStorage.removeItem('LogibObj');
  localStorage.removeItem('email');
}

export function hasRole(role) {
  const auth = getAuth();
  return Boolean(auth?.token && auth.role === role);
}