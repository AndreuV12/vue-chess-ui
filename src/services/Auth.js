// auth.js
export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}
