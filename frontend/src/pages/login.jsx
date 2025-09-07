import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {login} from '../backend/api';
import { FaApple, FaDiscord, FaGoogle } from 'react-icons/fa';
import { Button } from '../components/ui/button.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationStarted(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Client-side validation
        if (!formData.username.trim()) {
            setError('Please enter your username');
            setIsLoading(false);
            return;
        }

        if (!formData.password.trim()) {
            setError('Please enter your password');
            setIsLoading(false);
            return;
        }

        navigate('/'); // Redirect to home page immediately

        // try {
        //     const response = await login(formData.username, formData.password);

        //     if (response.error) {
        //         setError(response.error);
        //     } else {
        //         // Handle successful login - store token and redirect
        //         console.log('Login successful:', response);

        //         // Store the token in localStorage if provided
        //         if (response.token) {
        //             localStorage.setItem('token', response.token);
        //         }

        //         // Redirect to home page
        //         navigate('/');
        //     }
        // } catch {
        //     setError('An error occurred during login');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <>
            <div
                className='min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat py-8 pt-20'
                style={{
                    background: 'linear-gradient(135deg, #19191a, #373737)',
                }}
            >
                <div className='bg-white auth-container p-8 w-full max-w-4xl min-h-[80vh] flex items-center justify-center shadow-lg rounded-lg relative border border-gray-300'>
                    {/* Animated Logo - starts centered and large, moves to top and shrinks */}
                    <div
                        className={`absolute transition-all duration-2000 ease-out ${
                            animationStarted
                                ? 'top-4 left-1/2 transform -translate-x-1/2'
                                : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        }`}
                    >
                        <div className='text-center'>
                            <h1
                                className={`header-logo transition-all duration-2500 ease-out ${
                                    animationStarted
                                        ? 'text-9xl'
                                        : 'text-[12rem]'
                                }`}
                                style={{
                                    color: '#19191a',
                                    fontSize: animationStarted
                                        ? '6rem'
                                        : '10rem',
                                    lineHeight: animationStarted ? '1' : '1.1',
                                    marginBottom: animationStarted
                                        ? '0.5rem'
                                        : '1rem',
                                    transform: animationStarted
                                        ? 'scale(1)'
                                        : 'scale(1.2)',
                                    transformOrigin: 'center',
                                }}
                            >
                                COVE
                            </h1>
                            <p
                                className={`transition-all duration-2500 ease-out italic ${
                                    animationStarted ? 'text-2xl' : 'text-2xl'
                                }`}
                                style={{
                                    color: '#19191a',
                                    marginTop: animationStarted
                                        ? '0.25rem'
                                        : '1rem',
                                    transform: animationStarted
                                        ? 'scale(1)'
                                        : 'scale(1.1)',
                                    transformOrigin: 'center',
                                }}
                            >
                                Helping you write in peace
                            </p>
                        </div>
                    </div>

                    {/* Login Form - fades in during logo animation */}
                    <div
                        className={`w-full transition-opacity duration-1500 ease-out delay-700 ${
                            animationStarted ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {/* Spacer for logo - adjusted to better accommodate the larger logo */}
                        <div className='h-28 mb-4'></div>
                        <div className='!text-base !font-medium mb-8 text-center text-gray-700'>
                            We're glad to see you back!
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className='grid grid-cols-2 gap-8 items-start mb-6'
                        >
                            {/* First Column - Main Login Form */}
                            <div className='flex flex-col gap-4 p-4 rounded-lg border border-gray-300'>
                                {/* Sign In Label */}
                                <div className='flex items-center gap-4 mb-2'>
                                    <div className='flex-1 h-px bg-black' />
                                    <span className='text-sm raleway text-black'>
                                        login
                                    </span>
                                    <div className='flex-1 h-px bg-black' />
                                </div>

                                <div className='flex flex-col'>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder='Username'
                                        className='p-3 bg-[#19191a] focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Password'
                                        className='p-3 bg-[#19191a] focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800'
                                    />
                                </div>

                                <Button
                                    type='submit'
                                    className='w-full py-3 px-6 font-medium transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed raleway'
                                    disabled={isLoading}
                                    variant='default'
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </Button>

                                {/* Login Form Error Display */}
                                {error && (
                                    <div className='bg-red-50 text-red-600 p-3 border border-red-200 text-sm text-center rounded-md raleway'>
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* Second Column - Social Login & Sign Up */}
                            <div className='flex flex-col gap-4 p-4'>
                                {/* Divider */}
                                <div className='flex items-center gap-4 mb-2'>
                                    <div className='flex-1 h-px bg-gray-400' />
                                    <span className='text-sm text-gray-600'>
                                        or continue with
                                    </span>
                                    <div className='flex-1 h-px bg-gray-400' />
                                </div>

                                {/* Social Buttons */}
                                <div className='flex flex-col gap-4'>
                                    {/* Google */}
                                    <button
                                        type='button'
                                        onClick={() => navigate('/')}
                                        className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-gray-700 border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200'
                                    >
                                        <FaGoogle className='text-red-500' />
                                        <span>Sign in with Google</span>
                                    </button>

                                    {/* Apple */}
                                    <button
                                        type='button'
                                        onClick={() => navigate('/')}
                                        className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-white bg-black hover:bg-gray-900 transition-all duration-200'
                                    >
                                        <FaApple className='text-white text-lg' />
                                        <span>Sign in with Apple</span>
                                    </button>

                                    {/* Discord */}
                                    <button
                                        type='button'
                                        onClick={() => navigate('/')}
                                        className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-200'
                                    >
                                        <FaDiscord className='text-white text-lg' />
                                        <span>Sign in with Discord</span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Centered Sign Up Link */}
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex-1 h-px bg-gray-400' />
                            <div className='text-center text-sm text-gray-600'>
                                Don't have an account?{' '}
                                <a
                                    href='/signup'
                                    className='hover:text-orange-600 underline transition-colors duration-200 text-orange-500'
                                >
                                    Sign up
                                </a>
                            </div>
                            <div className='flex-1 h-px bg-gray-400' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
