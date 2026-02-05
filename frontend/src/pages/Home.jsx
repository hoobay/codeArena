import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Bonjour {user?.user_metadata?.username}</h2>
      <button onClick={handleLogout}>Se deconnecter</button>
    </div>
  );
};

export default Home;
