import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await register(email, password, username);

    if (res.error) {
      setError(res.error.message);
      setLoading(false);
      return;
    }

    navigate('/');
  };

  return (
    <div>
      <h2>Inscription</h2>

      <form onSubmit={submit}>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" />
        <button disabled={loading}>{loading ? 'Inscription...' : "S'inscrire"}</button>
      </form>

      {error && <p>{error}</p>}

      <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
    </div>
  );
};

export default Register;
