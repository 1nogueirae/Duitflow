import { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import { MdDashboard, MdHome } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa6";

import './Sidebar.css';

export const Sidebar = () => {

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

            <div className="theme-toggle"
                onClick={handleThemeToggle}
            >
                <div>
                    <ThemeIcon size={30} />
                </div>
            </div>
        </aside>
    );
};