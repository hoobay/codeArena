import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);

    if (res.error) {
      setError(res.error.message);
      setLoading(false);
      return;
    }

    navigate('/');
  };

  return (
    <div>
      <h2>Connexion</h2>

      <form onSubmit={submit}>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" />
        <button disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'}</button>
      </form>

      {error && <p>{error}</p>}

      <p>Pas de compte ? <Link to="/register">S'inscrire</Link></p>
    </div>
  );
};

export default Login;
