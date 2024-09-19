// auth.js
import { jwtDecode } from "jwt-decode";

export function setToken(token) {
  localStorage.setItem("accessToken", token);
}

export function clearToken() {
  localStorage.removeItem("accessToken");
}

export function getValidToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    console.log(exp, currentTime);

    if (exp > currentTime) {
      return token;
    } else {
      console.log("Token expired -> clearning");

      clearToken();
      return false;
    }
  } catch (e) {
    console.error("Invalid token:", e, "-> clearning");
    clearToken();
    return false;
  }
}

export function isAuthenticated() {
  return Boolean(getValidToken());
}

export function getUser() {
  const token = getValidToken();
  if (!token) return null;
  const { sub: username, email } = jwtDecode(token);
  return { username, email };
}
