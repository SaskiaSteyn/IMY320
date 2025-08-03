import React, {useState} from 'react';
import {login} from '../backend/api';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await login(formData.username, formData.password);

            if (response.error) {
                setError(response.error);
            } else {
                // Handle successful login (redirect, etc.)
                console.log('Login successful:', response);
            }
        } catch {
            setError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-cover bg-center bg-no-repeat font-['American_Typewriter',serif] bg-[url('/images/login-fireplace.png')]">
            <div className="bg-white/75 backdrop-blur-sm p-12 w-full max-w-md h-screen flex flex-col justify-center shadow-lg">
                {/* Brand Header */}
                <div className="mb-8 flex justify-center">
                    <img
                        src="/images/CoveLogo.svg"
                        alt="Cove Logo"
                        className="w-full h-auto"
                    />
                </div>

                <div className="!text-xl !font-medium mb-8 text-[#4e1f08] text-left">
                    We're glad to see you back!
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 border border-red-200 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Username"
                            className="p-3 bg-transparent placeholder-[#4e1f08] focus:outline-none transition-all duration-200 border-2 border-[#4e1f08] text-[#4e1f08] rounded-md"
                        />
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            className="p-3 bg-transparent placeholder-[#4e1f08] focus:outline-none transition-all duration-200 border-2 border-[#4e1f08] text-[#4e1f08] rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="py-3 px-6 font-medium cursor-pointer transition-all duration-200 text-white hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#4e1f08] rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="text-center text-sm mt-4 text-[#4e1f08]">
                        Don't have an account? {' '}
                        <a href="/signup"
                            className="!font-bold hover:underline transition-colors duration-200 text-[#4e1f08]">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
