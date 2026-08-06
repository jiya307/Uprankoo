import type { ReactNode } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth, normalizeRole, type AuthUser } from "./AuthContext";

export default function RoleRoute({ allowedRoles, children }: { allowedRoles: AuthUser['role'][]; children: ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const currentRole = normalizeRole(user.role);

  if (!allowedRoles.includes(currentRole)) {
    const fallbackPath = currentRole === 'owner' ? '/owner' : currentRole === 'user' ? '/account' : '/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}