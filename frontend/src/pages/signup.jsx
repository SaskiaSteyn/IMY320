import { useState } from 'react';
import { FaApple, FaDiscord, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../backend/api';

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
        <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-[url('/images/Background-Cozy2.jpeg')]">
            <div className='bg-white/75 backdrop-blur-sm p-12 w-full max-w-4xl h-auto flex items-center justify-center shadow-lg rounded-lg relative border border-[#4e1f08]/40'>
                {/* Static Logo */}
                <div className='absolute top-8 left-1/2 transform -translate-x-1/2'>
                    <img
                        src='/images/CoveLogo.svg'
                        alt='Cove Logo'
                        className='w-72 h-auto'
                    />
                </div>

                {/* Signup Form */}
                <div className='w-full'>
                    {/* Spacer for logo */}
                    <div className='h-20 mb-8'></div>

                    <div className='!text-xl !font-medium mb-6 text-[#4e1f08] text-center'>
                        Welcome to Cove! Let's get you started.
                    </div>

                    {error && (
                        <div className='bg-red-50 text-red-600 p-3 border border-red-200 text-sm text-center mb-4'>
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className='grid grid-cols-2 gap-8 items-start'
                    >
                        {/* First Column - Main Signup Form */}
                        <div className='flex flex-col gap-4 bg-black/10 p-4 rounded-lg border border-[#4e1f08]'>
                            {/* Sign Up Label */}
                            <div className='flex items-center gap-4 mb-2'>
                                <div className='flex-1 h-px bg-[#4e1f08]/40' />
                                <span className='text-sm text-[#4e1f08]/70'>
                                    sign up
                                </span>
                                <div className='flex-1 h-px bg-[#4e1f08]/40' />
                            </div>

                            <div className='flex flex-col'>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder='Username'
                                    className='p-3 bg-white/0 focus:bg-white/0 hover:bg-white/0 active:bg-white/0 placeholder-[#4e1f08] focus:outline-none transition-all duration-200 border-2 border-[#4e1f08]/60 focus:border-[#4e1f08] text-[#4e1f08] rounded-md [&:-webkit-autofill]:bg-white/0 [&:-webkit-autofill]:!bg-white/0 [&:-webkit-autofill:hover]:bg-white/0 [&:-webkit-autofill:focus]:bg-white/0 [&:-webkit-autofill:active]:bg-white/0 [&:not(:placeholder-shown)]:bg-white/0'
                                    style={{
                                        backgroundColor:
                                            'transparent !important',
                                        WebkitBoxShadow:
                                            '0 0 0 1000px transparent inset !important',
                                        WebkitTextFillColor:
                                            '#4e1f08 !important',
                                    }}
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
                                    className='p-3 bg-white/0 focus:bg-white/0 hover:bg-white/0 active:bg-white/0 placeholder-[#4e1f08] focus:outline-none transition-all duration-200 border-2 border-[#4e1f08]/60 focus:border-[#4e1f08] text-[#4e1f08] rounded-md [&:-webkit-autofill]:bg-white/0 [&:-webkit-autofill]:!bg-white/0 [&:-webkit-autofill:hover]:bg-white/0 [&:-webkit-autofill:focus]:bg-white/0 [&:-webkit-autofill:active]:bg-white/0 [&:not(:placeholder-shown)]:bg-white/0'
                                    style={{
                                        backgroundColor:
                                            'transparent !important',
                                        WebkitBoxShadow:
                                            '0 0 0 1000px transparent inset !important',
                                        WebkitTextFillColor:
                                            '#4e1f08 !important',
                                    }}
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
                                    className='p-3 bg-white/0 focus:bg-white/0 hover:bg-white/0 active:bg-white/0 placeholder-[#4e1f08] focus:outline-none transition-all duration-200 border-2 border-[#4e1f08]/60 focus:border-[#4e1f08] text-[#4e1f08] rounded-md [&:-webkit-autofill]:bg-white/0 [&:-webkit-autofill]:!bg-white/0 [&:-webkit-autofill:hover]:bg-white/0 [&:-webkit-autofill:focus]:bg-white/0 [&:-webkit-autofill:active]:bg-white/0 [&:not(:placeholder-shown)]:bg-white/0'
                                    style={{
                                        backgroundColor:
                                            'transparent !important',
                                        WebkitBoxShadow:
                                            '0 0 0 1000px transparent inset !important',
                                        WebkitTextFillColor:
                                            '#4e1f08 !important',
                                    }}
                                />
                            </div>

                            <button
                                type='submit'
                                className='py-3 px-6 font-medium cursor-pointer transition-all duration-200 text-white hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#4e1f08] rounded-md'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>

                            {/* Signup Form Error Display */}
                            {error && (
                                <div className='bg-red-50 text-red-600 p-3 border border-red-200 text-sm text-center rounded-md'>
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Second Column - Social Signup */}
                        <div className='flex flex-col gap-4 p-4'>
                            {/* Divider */}
                            <div className='flex items-center gap-4 mb-2'>
                                <div className='flex-1 h-px bg-[#4e1f08]/40' />
                                <span className='text-sm text-[#4e1f08]/70'>
                                    or continue with
                                </span>
                                <div className='flex-1 h-px bg-[#4e1f08]/40' />
                            </div>

                            {/* Social Buttons */}
                            <div className='flex flex-col gap-4'>
                                {/* Google */}
                                <button
                                    type='button'
                                    onClick={() =>
                                        console.log('Sign up with Google')
                                    }
                                    className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-[#4e1f08] border-2 border-[#4e1f08] bg-white hover:bg-[#f5f5f5] transition-all duration-200'
                                >
                                    <FaGoogle className='text-red-500' />
                                    <span>Sign up with Google</span>
                                </button>

                                {/* Apple */}
                                <button
                                    type='button'
                                    onClick={() =>
                                        console.log('Sign up with Apple')
                                    }
                                    className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-white bg-black hover:bg-gray-900 transition-all duration-200'
                                >
                                    <FaApple className='text-white text-lg' />
                                    <span>Sign up with Apple</span>
                                </button>

                                {/* Discord */}
                                <button
                                    type='button'
                                    onClick={() =>
                                        console.log('Sign up with Discord')
                                    }
                                    className='flex items-center justify-center gap-3 w-full p-3 rounded-md font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-200'
                                >
                                    <FaDiscord className='text-white text-lg' />
                                    <span>Sign up with Discord</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Centered Login Link */}
                    <div className='flex items-center gap-4 mt-6'>
                        <div className='flex-1 h-px bg-[#4e1f08]/40' />
                        <div className='text-center text-sm text-[#4e1f08]'>
                            Already have an account?{' '}
                            <a
                                href='/login'
                                className='hover:text-[#222600] !important underline transition-colors duration-200 text-[#4e1f08]'
                            >
                                Login
                            </a>
                        </div>
                        <div className='flex-1 h-px bg-[#4e1f08]/40' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
