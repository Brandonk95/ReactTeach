import PocketBase from 'pocketbase';
import { useCallback, useEffect, useState } from 'react';

// PocketBase serves this site in production, so it lives on the same origin.
// In development Vite proxies /api to it. VITE_PB_URL overrides both.
export const pb = new PocketBase(import.meta.env.VITE_PB_URL || window.location.origin);
pb.autoCancellation(false);

function friendlyAuthError(err) {
  if (err?.status === 400) return 'Wrong email or password.';
  if (err?.status === 429) return 'Too many attempts. Wait a minute and try again.';
  if (!err?.status || err.status >= 500) return "Can't reach the server. Is PocketBase running?";
  return err.message || 'Sign-in failed.';
}

function friendlySignUpError(err) {
  if (err?.status === 403) return 'Sign-up is closed. Ask the site owner for an account.';
  if (!err?.status || err.status >= 500) return "Can't reach the server. Is PocketBase running?";
  const fields = err.response?.data || {};
  if (fields.email?.code === 'validation_not_unique') return 'An account with that email already exists. Try signing in.';
  if (fields.email) return 'Enter a valid email address.';
  if (fields.password) return 'Password must be at least 8 characters.';
  return err.message || 'Sign-up failed.';
}

// The signed-in user (or null), plus sign-in / sign-up / sign-out.
export function useAuth() {
  const [user, setUser] = useState(() => (pb.authStore.isValid ? pb.authStore.record : null));
  const [checking, setChecking] = useState(pb.authStore.isValid);

  useEffect(() => pb.authStore.onChange(() => setUser(pb.authStore.isValid ? pb.authStore.record : null)), []);

  // Confirm a remembered session is still valid (the account may have been
  // deleted or the token expired). If the server is unreachable, keep the
  // session so the course still works offline from the local cache.
  useEffect(() => {
    if (!pb.authStore.isValid) return;
    pb.collection('users')
      .authRefresh()
      .catch((err) => {
        // Only sign out if the server answered and rejected the session.
        if (err?.status === 401 || err?.status === 403 || err?.status === 404) pb.authStore.clear();
      })
      .finally(() => setChecking(false));
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      await pb.collection('users').authWithPassword(email, password);
    } catch (err) {
      throw new Error(friendlyAuthError(err));
    }
  }, []);

  // Creates an account, then signs straight in with it.
  const signUp = useCallback(async (email, password) => {
    try {
      await pb.collection('users').create({ email, password, passwordConfirm: password });
    } catch (err) {
      throw new Error(friendlySignUpError(err));
    }
    await signIn(email, password);
  }, [signIn]);

  const signOut = useCallback(() => pb.authStore.clear(), []);

  return { user, checking, signIn, signUp, signOut };
}
