/**
 * Utility functions for managing authentication tokens
 */

export const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  TOKEN_TYPE: "tokenType",
  EXPIRES_IN: "expiresIn",
  REFRESH_EXPIRES_IN: "refreshExpiresIn",
} as const;

/**
 * Save authentication tokens to localStorage
 */
export const saveTokens = (tokens: {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in: number;
}) => {
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, tokens.access_token);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, tokens.refresh_token);
  localStorage.setItem(TOKEN_KEYS.TOKEN_TYPE, tokens.token_type);
  localStorage.setItem(TOKEN_KEYS.EXPIRES_IN, tokens.expires_in.toString());
  localStorage.setItem(TOKEN_KEYS.REFRESH_EXPIRES_IN, tokens.refresh_expires_in.toString());
};

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
};

/**
 * Get token type from localStorage
 */
export const getTokenType = (): string | null => {
  return localStorage.getItem(TOKEN_KEYS.TOKEN_TYPE);
};

/**
 * Check if access token is expired
 */
export const isAccessTokenExpired = (): boolean => {
  const expiresIn = localStorage.getItem(TOKEN_KEYS.EXPIRES_IN);
  if (!expiresIn) return true;
  
  const expiresAt = parseInt(expiresIn) * 1000; // Convert to milliseconds
  const now = Date.now();
  
  return now >= expiresAt;
};

/**
 * Check if refresh token is expired
 */
export const isRefreshTokenExpired = (): boolean => {
  const refreshExpiresIn = localStorage.getItem(TOKEN_KEYS.REFRESH_EXPIRES_IN);
  if (!refreshExpiresIn) return true;
  
  const expiresAt = parseInt(refreshExpiresIn) * 1000; // Convert to milliseconds
  const now = Date.now();
  
  return now >= expiresAt;
};

/**
 * Clear all tokens from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.TOKEN_TYPE);
  localStorage.removeItem(TOKEN_KEYS.EXPIRES_IN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_EXPIRES_IN);
};

/**
 * Check if user is authenticated (has valid tokens)
 */
export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  if (!accessToken || !refreshToken) return false;
  
  // If access token is expired but refresh token is still valid, user is still authenticated
  return !isRefreshTokenExpired();
};
