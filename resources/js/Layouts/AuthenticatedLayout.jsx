import {useState, useEffect} from "react";
import axios from 'axios';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthenticatedLayout({ user, header, children }) {
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
                    <a className="btn btn-ghost text-xl max-sm:hidden" href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current"/>
                    </a>
                    <a className="btn btn-ghost text-sm lg:hidden">
                        <label htmlFor="main-drawer" className="drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"/>
                            </svg>
                        </label>
                    </a>
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
                                <button type="button" className="justify-center" onClick={async () => {
                                    await axios.post(route('logout')).then(() => window.location.reload())
                                }}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer lg:drawer-open">
                <input id="main-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    {header && (
                        <header className="artboard">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                        </header>
                    )}
                    <main>{children}</main>
                </div>
                <div className="drawer-side">
                    <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 lg:w-60 w-40 min-h-full bg-base-200 text-base-content">
                        <li>
                            <a href={route('dashboard')}
                               className={route().current('dashboard') ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href={route('categories.index')}
                               className={route().current('categories.index') ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"/>
                                </svg>
                                Category
                            </a>
                        </li>
                        <li>
                            <a href={route('accounts.index')}
                               className={route().current('accounts.index') ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"/>
                                </svg>
                                Account
                            </a>
                        </li>
                        <li>
                            <a href={route('transactions.index')}
                               className={route().current('transactions.index') ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"/>
                                </svg>
                                Transaction
                            </a>
                        </li>
                        {
                            <li>
                                <details open>
                                    <summary className="rounded-lg cursor-pointer">
                                        Admin
                                    </summary>
                                    <ul>
                                        <li>
                                            <a href="/"
                                                // className={route().current('roles.index') ? 'active' : ''}
                                            >
                                                Roles
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
