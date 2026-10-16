import { useEffect, useState } from 'react';
import LoginPage from './LoginPage.jsx';
import TodoPage from './TodoPage.jsx';

const AUTH_KEY = 'daylist-authenticated';
const getPage = () => window.location.pathname === '/todos' ? 'todos' : 'login';

export default function App() {
  const [page, setPage] = useState(getPage);
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');

  useEffect(() => {
    const handlePopState = () => setPage(getPage());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (page === 'todos' && !authenticated) {
      window.history.replaceState({}, '', '/login');
      setPage('login');
    } else if (page === 'login' && authenticated) {
      window.history.replaceState({}, '', '/todos');
      setPage('todos');
    }
  }, [page, authenticated]);

  function logIn() {
    sessionStorage.setItem(AUTH_KEY, 'true');
    setAuthenticated(true);
    window.history.pushState({}, '', '/todos');
    setPage('todos');
  }

  function logOut() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    window.history.pushState({}, '', '/login');
    setPage('login');
  }

  return page === 'todos' && authenticated ? <TodoPage onLogout={logOut} /> : <LoginPage onLogin={logIn} />;
}
