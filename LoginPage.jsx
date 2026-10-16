import { useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('That email and password do not match. Try the demo details below.');
      return;
    }
    setError('');
    onLogin();
  }

  return (
    <main className="login-layout">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">d</div>
        <p className="eyebrow">A LITTLE MORE ORGANIZED</p>
        <h1 id="login-title">Make room for<br />what matters.</h1>
        <p className="login-copy">Your day, one small step at a time.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button login-button" type="submit">Sign in <span aria-hidden="true">→</span></button>
        </form>
        <div className="demo-note"><span className="demo-dot" aria-hidden="true" /><div><strong>Demo account</strong><br /><span>student@example.com · password123</span></div></div>
      </section>
      <aside className="login-art" aria-label="A calm place to plan your day">
        <div className="sun-shape" />
        <div className="art-note note-one"><span>✦</span> one thing at a time</div>
        <div className="art-note note-two">☼ &nbsp;you've got this</div>
        <div className="art-center"><div className="art-sun">✳</div><div className="art-caption">A softer way<br />to get things done.</div></div>
        <div className="art-ground" />
      </aside>
    </main>
  );
}
