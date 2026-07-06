import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { FaPlus, FaListCheck } from 'react-icons/fa6';

import './Home.css';

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <header className="home-header">
                <h1>{getGreeting()}, {user?.name}!</h1>
                <p className="secondary-text">What do you want to do today?</p>
            </header>

            <div className="home-shortcuts">
                <button
                    className="home-shortcut-card"
                    onClick={() => navigate('/dashboard', { state: { openCreate: true } })}
                >
                    <FaPlus size={22} />
                    <span>New task</span>
                </button>

                <button
                    className="home-shortcut-card"
                    onClick={() => navigate('/dashboard')}
                >
                    <FaListCheck size={22} />
                    <span>View my tasks</span>
                </button>
            </div>
        </>
    );
}

export default Home;