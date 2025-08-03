import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {logout} from '../backend/api';

function WriteInPeace() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className='min-h-screen p-8 flex flex-col items-center justify-center'>
            <h1>Coming Soon!</h1>
            <p>Watch the space to learn more about writing in peace!</p>
            <div className='flex gap-4 mt-6'>
                <Link to='/' className='cta-button'>
                    Back to Home
                </Link>
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className='cta-button bg-red-600 hover:bg-red-700'
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}

export default WriteInPeace;
