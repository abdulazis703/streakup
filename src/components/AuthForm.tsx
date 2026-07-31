"use client";
import React, { useState } from 'react';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  buttonLabel: string;
}

export default function AuthForm({ onSubmit, buttonLabel }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(email, password);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            className="w-full h-14 rounded-xl bg-surface-container-lowest text-on-surface px-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="nama@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">
            alternate_email
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          Kata Sandi
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            required
            className="w-full h-14 rounded-xl bg-surface-container-lowest text-on-surface px-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              const inp = document.getElementById('password') as HTMLInputElement;
              inp.type = inp.type === 'password' ? 'text' : 'password';
            }}
            className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant cursor-pointer"
          >
            visibility
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-primary text-on-primary font-headline-md rounded-xl shadow-md hover:scale-[1.02] transition-transform disabled:opacity-50"
      >
        {loading ? 'Mengirim...' : buttonLabel}
      </button>
    </form>
  );
}
