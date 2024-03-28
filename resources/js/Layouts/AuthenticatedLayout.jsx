import {useState, useEffect} from "react";
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia'
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthenticatedLayout({ user, permissions, header, children }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "lighter");

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("darker");
        } else {
            setTheme("lighter");
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html')?.setAttribute('data-theme', localTheme)
    }, [theme]);

    return (
        <div className="min-h-screen">
            <div className="navbar bg-primary">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg href="/" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a href={route('dashboard')}
                                   className={route().current('dashboard') ? 'border border-neutral' : ''}>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href={route('chirps.index')}
                                   className={route().current('chirps.index') ? 'border border-neutral' : ''}>
                                    Chirps
                                </a>
                            </li>
                            {
                                permissions['product-list'] &&
                                <li>
                                    <a href={route('products.index')}
                                       className={route().current('products.index') ? 'border border-neutral' : ''}>
                                        Products
                                    </a>
                                </li>
                            }
                            {
                                permissions['role-list'] &&
                                <li>
                                    <a href={route('roles.index')}
                                       className={route().current('roles.index') ? 'border border-neutral' : ''}>
                                        Roles
                                    </a>
                                </li>
                            }
                            {
                                permissions['user-list'] &&
                                <li>
                                    <a href={route('users.index')}
                                       className={route().current('users.index') ? 'border border-neutral' : ''}>
                                        Users
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl" href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current"/>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className="mr-1">
                            <a href={route('dashboard')}
                               className={route().current('dashboard') ? 'border border-neutral' : ''}>
                                Dashboard
                            </a>
                        </li>
                        <li className="mr-1">
                            <a href={route('chirps.index')}
                               className={route().current('chirps.index') ? 'border border-neutral' : ''}>
                                Chirps
                            </a>
                        </li>
                        {
                            permissions['product-list'] &&
                            <li className="mr-1">
                                <a href={route('products.index')}
                                   className={route().current('products.index') ? 'border border-neutral' : ''}>
                                    Products
                                </a>
                            </li>
                        }
                        {
                            permissions['role-list'] &&
                            <li className="mr-1">
                                <a href={route('roles.index')}
                                   className={route().current('roles.index') ? 'border border-neutral' : ''}>
                                    Roles
                                </a>
                            </li>
                        }
                        {
                            permissions['user-list'] &&
                            <li className="mr-1">
                                <a href={route('users.index')}
                                   className={route().current('users.index') ? 'border border-neutral' : ''}>
                                    Users
                                </a>
                            </li>
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            Profile
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-primary border border-secondary">
                            <li>
                                <a className="justify-center" href={route('profile.edit')}>
                                    {user.name}
                                </a>
                            </li>
                            <li>
                                <label className="swap swap-rotate">
                                    <input type="checkbox" onChange={handleToggle} className="hidden"/>
                                    <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                                    </svg>
                                    <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                                    </svg>
                                </label>
                            </li>
                            <li>
                                <button type="button" className="justify-center" onClick={() => {
                                    axios.post(route('logout')).then(() => {
                                        Inertia.reload({
                                            preserveState: false
                                        });
                                    })
                                }}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {header && (
                <header className="artboard">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
