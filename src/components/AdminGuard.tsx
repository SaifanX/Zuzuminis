"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Lock, Eye, EyeOff, Sparkles } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedToken = localStorage.getItem("zuzu_admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Check if session is valid in DB
  const sessionCheck = useQuery(
    api.adminAuth.checkSession,
    isMounted ? { token } : "skip"
  );

  const verifyPassword = useMutation(api.adminAuth.verifyPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await verifyPassword({ password });
      if (result.success && result.token) {
        localStorage.setItem("zuzu_admin_token", result.token);
        setToken(result.token);
        setPassword("");
      } else {
        setError(result.error || "Incorrect admin password");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Wait for client-side mounting to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-zuzu-pink border-t-transparent animate-spin" />
      </div>
    );
  }

  // If query is loading and we have a token, show loading state
  if (token && sessionCheck === undefined) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-zuzu-pink border-t-transparent animate-spin" />
      </div>
    );
  }

  // If session is valid, render children (admin pages)
  if (sessionCheck?.valid) {
    return <>{children}</>;
  }

  // Otherwise, render the premium dark boutique login screen
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 overflow-hidden select-none">
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-zuzu-pink/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-zuzu-blue/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 text-zuzu-pink relative group">
            <Lock className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 text-yellow-300 animate-bounce">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
          </div>
          <h1 className="text-2xl font-light tracking-tight text-white mb-2">
            Boutique <span className="font-normal text-zuzu-pink">Control</span>
          </h1>
          <p className="text-xs text-white/45 uppercase tracking-[0.2em]">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-white/60 ml-2 font-bold">Admin Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 text-white placeholder-white/20 border border-white/10 rounded-2xl px-5 py-4 pr-12 outline-none focus:border-zuzu-pink/50 focus:ring-2 focus:ring-zuzu-pink/20 transition-all duration-300 font-medium text-sm"
                placeholder="Enter password..."
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium tracking-wide text-center">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-zuzu-pink text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-zuzu-pink/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-lg shadow-zuzu-pink/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Unlock Console"
            )}
          </button>
        </form>

        <p className="text-[9px] text-white/30 text-center mt-8 uppercase tracking-[0.15em]">
          Secured via Convex DB Secrets
        </p>
      </div>
    </div>
  );
}
