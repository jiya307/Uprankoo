import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode') ?? '';
  const { verifyResetCode, confirmReset } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!oobCode) { setInvalid(true); setChecking(false); return; }
    verifyResetCode(oobCode)
      .then(setEmail)
      .catch(() => setInvalid(true))
      .finally(() => setChecking(false));
  }, [oobCode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      await confirmReset(oobCode, password);
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  }

  if (checking) return <p>Checking reset link…</p>;
  if (invalid) return (
    <div>
      <p>This reset link is invalid or has expired.</p>
      <Link to="/forgot-password">Request a new link</Link>
    </div>
  );
  if (done) return (
    <div>
      <p>Password updated for {email}. You can now sign in.</p>
      <Link to="/login">Go to Sign In</Link>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <p>Resetting password for {email}</p>
      <input type="password" placeholder="New password" value={password}
        onChange={e => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm new password" value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Updating…' : 'Reset Password'}</button>
    </form>
  );
}