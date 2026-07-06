import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';

import { FaMoon, FaSun } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';

import './Sidebar.css';

export const Sidebar = () => {
    const { logout } = useAuth();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const handleThemeToggle = () => setDarkMode(!darkMode);
    const ThemeIcon = darkMode ? FaSun : FaMoon;

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <aside className="sidebar">
            <NavLink to="/home" className="logo" title="Duitflow">D</NavLink>

            <nav className="menu">
                <NavLink to="/home" title="Home">
                    <IoHomeOutline size={22} />
                </NavLink>
                <NavLink to="/dashboard" title="Dashboard">
                    <MdDashboard size={22} />
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="theme-toggle" onClick={handleThemeToggle} title="Toggle theme">
                    <ThemeIcon size={20} />
                </div>
                <div className="logout-button" id="logout-button" onClick={logout} title="Logout">
                    <CiLogout size={22} />
                </div>
            </div>
        </aside>
    );
};