// ==========================================
// PlantCare AI — Authentication Service
// ==========================================

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { useState, useEffect, useCallback } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseAuth: SupabaseClient | null = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// ==========================================
// Auth Context (React Hook)
// ==========================================

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!supabaseAuth) return;

    // Get initial session
    supabaseAuth.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ? {
          id: session.user.id,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
          avatarUrl: session.user.user_metadata?.avatar_url,
        } : null,
        loading: false,
        error: null,
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange(
      (event, session) => {
        setState({
          user: session?.user ? {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
          } : null,
          loading: false,
          error: null,
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabaseAuth) throw new Error('Auth not configured');

    setState(s => ({ ...s, loading: true, error: null }));

    try {
      const { data, error } = await supabaseAuth.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setState({
        user: {
          id: data.user.id,
          email: data.user.email || '',
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
        },
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState(s => ({ ...s, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    if (!supabaseAuth) throw new Error('Auth not configured');

    setState(s => ({ ...s, loading: true, error: null }));

    try {
      const { data, error } = await supabaseAuth.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      setState({
        user: data.user ? {
          id: data.user.id,
          email: data.user.email || '',
          fullName: fullName,
        } : null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState(s => ({ ...s, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!supabaseAuth) return;

    await supabaseAuth.auth.signOut();
    setState({ user: null, loading: false, error: null });
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!supabaseAuth) throw new Error('Auth not configured');

    const { error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  }, []);

  const updateProfile = useCallback(async (updates: { fullName?: string; avatarUrl?: string }) => {
    if (!supabaseAuth || !state.user) throw new Error('Not authenticated');

    const { error } = await supabaseAuth.auth.updateUser({
      data: {
        full_name: updates.fullName,
        avatar_url: updates.avatarUrl,
      },
    });

    if (error) throw error;

    setState(s => ({
      ...s,
      user: s.user ? { ...s.user, ...updates } : null,
    }));
  }, [state.user]);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };
}

// ==========================================
// Auth Components
// ==========================================

export function LoginForm() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export function RegisterForm() {
  const { signUp, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          placeholder="Nguyễn Văn A"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}

// ==========================================
// Protected Route Wrapper
// ==========================================

import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
