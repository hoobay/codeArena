import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Chargement...</p>;
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto' }}>
            <h2>
                Bonjour {user.user_metadata?.username || user.email}
            </h2>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default Home;
