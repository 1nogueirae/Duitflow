import { useAuth } from '../../contexts/AuthContext';

function Home() {
    const { user } = useAuth();

    return (
        <header className="home-header">
            <h1>Home</h1>
            <p className="secondary-text">Hello, {user?.name}!</p>
        </header>
    );
}

export default Home;