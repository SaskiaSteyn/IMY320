import {useState} from 'react';
import {FaApple, FaDiscord, FaGoogle, FaEye, FaEyeSlash} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {login, register} from '../backend/api';
import {Button} from '../components/ui/button.jsx';
import Header from '../components/header.jsx';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userIDNumber: '',
        username: '',
        email: '',
        password: '',
        reenterPassword: '',
        role: 'admin',
    });
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showReenterPassword, setShowReenterPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        setValidationErrors((prev) => ({...prev, [name]: ''}));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Trim input
        const username = formData.username.trim();
        const email = formData.email.trim();
        const password = formData.password.trim();
        const reenterPassword = formData.reenterPassword.trim();

        // Validation
        const errors = {};
        if (!username) errors.username = 'Please enter your username';
        if (!email) errors.email = 'Please enter your email';
        if (!password) errors.password = 'Please enter your password';
        if (!reenterPassword) errors.reenterPassword = 'Please re-enter your password';
        if (password && reenterPassword && password !== reenterPassword) {
            errors.reenterPassword = 'Passwords do not match';
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;
        if (password && !passwordRegex.test(password)) {
            errors.password = 'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.';
        }

        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) {
            setIsLoading(false);
            return;
        }

        // Proceed with registration if validation passes
        try {
            const response = await register(formData);

            if (response.error) {
                setError(response.error);
            } else {
                // Auto-login
                const loginResponse = await login(username, password);

                if (loginResponse.error) {
                    setError('Registration successful, but auto-login failed. Please log in manually.');
                } else {
                    if (loginResponse.token) {
                        localStorage.setItem('token', loginResponse.token);
                    }
                    navigate('/');
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
                <Header />
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



                        <form
                            onSubmit={handleSubmit}
                            className='grid grid-cols-1 gap-8 items-start mb-6 px-4'
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
                                    {validationErrors.username && (
                                        <span className='text-red-600 text-xs mt-1'>{validationErrors.username}</span>
                                    )}
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
                                    {validationErrors.email && (
                                        <span className='text-red-600 text-xs mt-1'>{validationErrors.email}</span>
                                    )}
                                </div>


                                {/* New Password */}
                                <div className="flex flex-col relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="New Password"
                                        className="p-3 pr-10 bg-white focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {validationErrors.password && (
                                        <span className="text-red-600 text-xs mt-1">{validationErrors.password}</span>
                                    )}
                                </div>

                                {/* Re-enter Password */}
                                <div className="flex flex-col relative">
                                    <input
                                        type={showReenterPassword ? 'text' : 'password'}
                                        id="reenter-password"
                                        name="reenterPassword"
                                        value={formData.reenterPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter Password"
                                        className="p-3 pr-10 bg-white focus:bg-white hover:bg-white active:bg-white focus:outline-none transition-all duration-200 border-2 rounded-md raleway border-gray-300 focus:border-orange-500 text-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowReenterPassword(!showReenterPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                    >
                                        {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {validationErrors.reenterPassword && (
                                        <span className="text-red-600 text-xs mt-1">{validationErrors.reenterPassword}</span>
                                    )}
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

                                {/* Divider */}
                                <div className='flex items-center gap-4 mb-2'>
                                    <div className='flex-1 h-px bg-gray-400' />
                                    <span className='text-sm raleway text-gray-600'>
                                        or continue with
                                    </span>
                                    <div className='flex-1 h-px bg-gray-400' />
                                </div>

                                {/* Social Buttons */}
                                <div className="flex flex-row gap-4 justify-center">
                                    {/* Google */}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <FaGoogle className="text-red-500 text-xl" />
                                    </button>

                                    {/* Apple */}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-gray-900 transition-all duration-200"
                                    >
                                        <FaApple className="text-white text-xl" />
                                    </button>

                                    {/* Discord */}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-200"
                                    >
                                        <FaDiscord className="text-white text-xl" />
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
