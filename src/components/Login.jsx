import { useState } from 'react';

export function Login({ onSignIn, onSignUp }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const signingUp = mode === 'signup';

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await (signingUp ? onSignUp : onSignIn)(email.trim(), password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  function switchMode() {
    setMode(signingUp ? 'signin' : 'signup');
    setError('');
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">
          <span className="brand-logo">⚛</span> ReactTeach
        </div>
        <h1>{signingUp ? 'Create account' : 'Sign in'}</h1>
        <p className="muted">Your progress and code are saved to your account.</p>
        <label>
          Email
          <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete={signingUp ? 'new-password' : 'current-password'}
            minLength={signingUp ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
        <button className="btn btn-check btn-lg" disabled={busy}>
          {busy ? (signingUp ? 'Creating account…' : 'Signing in…') : signingUp ? 'Create account' : 'Sign in'}
        </button>
        <p className="login-note muted">
          {signingUp ? 'Already have an account? ' : 'New here? '}
          <button type="button" className="link" onClick={switchMode}>
            {signingUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </form>
    </div>
  );
}
