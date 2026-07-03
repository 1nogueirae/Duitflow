import { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { MdDashboard, MdHome } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

import './Sidebar.css';

export const Sidebar = () => {
    const { logout } = useAuth();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    }

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

            <NavLink to="/home">
                <div className="logo">Duitflow</div>
            </NavLink>

            <div className="menu">
                <NavLink to="/home">
                    <MdHome />
                    Home
                </NavLink>

                <NavLink to="/dashboard">
                    <MdDashboard />
                    Dashboard
                </NavLink>

                <NavLink to="/settings">
                    <IoIosSettings />
                    Settings
                </NavLink>
            </div>

            <div className="sidebar-footer">
                <div className="logout-button"
                    id="logout-button"
                    onClick={logout}
                >
                    <CiLogout size={30} />
                </div>
                <div className="theme-toggle"
                    onClick={handleThemeToggle}
                >
                    <div>
                        <ThemeIcon size={30} />
                    </div>
                </div>
            </div>
        </aside>
    );
};