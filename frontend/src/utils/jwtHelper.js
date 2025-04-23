// src/utils/jwtHelper.js

/**
 * Decode a JWT and return its payload, or null on failure.
 */
export function decodeToken(token) {
    try {
      const base64Payload = token.split('.')[1];
      return JSON.parse(atob(base64Payload));
    } catch {
      return null;
    }
  }

  export function getStoredToken() {
    return localStorage.getItem('token');
  }

  /** convenient: decode the stored token */
export function getUserFromToken() {
    const token = getStoredToken();
    if (!token) return null;
    return decodeToken(token);
  }
  
  /**
   * Given a user-role string, return the matching dashboard path.
   */
  export function dashboardPathForRole(role) {
    switch (role) {
      case 'buyer':
        return '/dashboard/buyer';
      case 'farmer':
        return '/dashboard/farmer';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  }
  
  /**
   * High-level helper: read token from storage, decode it,
   * and return the dashboard path. Null if no valid token.
   */
  export function getDashboardPathFromStorage() {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const payload = decodeToken(token);
    if (!payload?.role) return null;
  
    return dashboardPathForRole(payload.role);
  }
  