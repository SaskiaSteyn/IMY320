import { useState } from 'react';
import { FaApple, FaDiscord, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../backend/api';
import { Button } from '../components/ui/button.jsx';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userIDNumber: '',
        username: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

        if (!formData.email.trim()) {
            setError('Please enter your email');
            setIsLoading(false);
            return;
        }

        if (!formData.password.trim()) {
            setError('Please enter your password');
            setIsLoading(false);
            return;
        }

        try {
            const response = await register(formData);

            if (response.error) {
                setError(response.error);
            } else {
                // Registration successful, now log in the user
                console.log('Registration successful:', response);

                // Automatically log in with the same credentials
                const loginResponse = await login(
                    formData.username,
                    formData.password
                );

                if (loginResponse.error) {
                    setError(
                        'Registration successful, but auto-login failed. Please log in manually.'
                    );
                } else {
                    // Store the token and redirect to home page
                    if (loginResponse.token) {
                        localStorage.setItem('token', loginResponse.token);
                    }
                    console.log('Auto-login successful:', loginResponse);
                    navigate('/'); // Redirect to home page
                }
            }
        } catch {
            setError('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className='min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat py-8 pt-20'
                style={{
                    background: 'linear-gradient(135deg, #19191a, #373737)',
                }}
            >
                <div className='bg-white/90 auth-container p-8 w-full max-w-4xl min-h-[80vh] flex items-center justify-center shadow-lg rounded-lg relative border border-gray-300'>
                    {/* Static Logo positioned like the final state of login page */}
                    <div className='absolute top-4 left-1/2 transform -translate-x-1/2'>
                        <div className='text-center'>
                            <h1
                                className='header-logo text-gray-800'
                                style={{
                                    fontSize: '6rem',
                                    lineHeight: '1',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                COVE
                            </h1>
                            <p
                                className='text-2xl italic text-gray-800'
                                style={{
                                    marginTop: '0.25rem',
                                }}
                            >
                                Helping you write in peace
                            </p>
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className='w-full'>
                        {/* Spacer for logo - adjusted to better accommodate the larger logo */}
                        <div className='h-28 mb-4'></div>
                        <div className='!text-base !font-medium mb-8 text-center text-gray-700'>
                            Welcome to Cove! Let's get you started.
                        </div>

                        {error && (
                            <div className='bg-red-50 text-red-600 p-3 border border-red-200 text-sm text-center mb-4'>
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className='grid grid-cols-2 gap-8 items-start mb-6'
                        >
                            {/* First Column - Main Signup Form */}
                            <div className='flex flex-col gap-4 bg-gray-50 p-4 rounded-lg border border-gray-300'>
                                {/* Sign Up Label */}
                                <div className='flex items-center gap-4 mb-2'>
                                    <div className='flex-1 h-px bg-gray-400' />
                                    <span className='text-sm raleway text-gray-700'>
                                        sign up
                                    </span>
                                    <div className='flex-1 h-px bg-gray-400' />
                                </div>

                                <div className='flex flex-col'>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder='Username'
                                        className='p-3 bg-white focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Email'
                                        className='p-3 bg-white focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800'
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
                                        className='p-3 bg-white focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800'
                                    />
                                </div>

                                <Button
                                    type='submit'
                                    className='w-full py-3 px-6 font-medium transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed raleway'
                                    disabled={isLoading}
                                    variant='default'
                                >
                                    {isLoading
                                        ? 'Creating Account...'
                                        : 'Sign Up'}
                                </Button>

                                {/* Signup Form Error Display */}
                                {error && (
                                    <div className='bg-red-50 text-red-600 p-3 border border-red-200 text-sm text-center rounded-md raleway'>
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* Second Column - Social Signup */}
                            <div className='flex flex-col gap-4 p-4'>
                                {/* Divider */}
                                <div className='flex items-center gap-4 mb-2'>
                                    <div className='flex-1 h-px bg-gray-400' />
                                    <span className='text-sm raleway text-gray-600'>
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
                                        className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium bg-white hover:bg-gray-50 transition-all duration-200 border-2 raleway text-gray-700 border-gray-300'
                                    >
                                        <FaGoogle className='text-red-500' />
                                        <span>Sign up with Google</span>
                                    </button>

                                    {/* Apple */}
                                    <button
                                        type='button'
                                        onClick={() => navigate('/')}
                                        className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-white bg-black hover:bg-gray-900 transition-all duration-200 raleway'
                                    >
                                        <FaApple className='text-white text-lg' />
                                        <span>Sign up with Apple</span>
                                    </button>

                                    {/* Discord */}
                                    <button
                                        type='button'
                                        onClick={() => navigate('/')}
                                        className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-200 raleway'
                                    >
                                        <FaDiscord className='text-white text-lg' />
                                        <span>Sign up with Discord</span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Centered Login Link */}
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex-1 h-px bg-gray-400' />
                            <div className='text-center text-sm raleway text-gray-600'>
                                Already have an account?{' '}
                                <a
                                    href='/login'
                                    className='hover:text-orange-600 underline transition-colors duration-200 text-orange-500'
                                >
                                    Login
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

export default Signup;
