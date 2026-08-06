
import type { ReactNode } from 'react';
import RoleRoute from './RoleRoute';

/**
 * Convenience wrapper around RoleRoute, locked to the 'owner' role.
 * NOTE: App.tsx currently guards all /owner/* routes directly with
 * <RoleRoute allowedRoles={['owner']}>, so this component isn't wired
 * into any route yet. It's kept (and now delegates to RoleRoute instead
 * of duplicating the redirect logic) in case you want a shorter,
 * dedicated wrapper for owner-only routes going forward, e.g.:
 *   <Route path="/owner" element={<OwnerRoute><OwnerDashboardHome /></OwnerRoute>} />
 */
export default function OwnerRoute({ children }: { children: ReactNode }) {
  return <RoleRoute allowedRoles={['owner']}>{children}</RoleRoute>;
}