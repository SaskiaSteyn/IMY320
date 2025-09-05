import { FaShoppingCart } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';

const FooterCard = ({ zIndex }) => {
    return (
        <div
            className='min-h-screen w-full relative bg-slate-900 flex items-center justify-center text-white'
            style={{ zIndex }}
        >
            <div className='container mx-auto px-8 py-16'>
                <div className='flex flex-col items-center gap-12'>
                    {/* Logo */}
                    <div>
                        <img
                            src='/images/cove-logo-footer.png'
                            alt='Cove Logo'
                            className='h-20 w-20 object-contain'
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
                        <Link
                            to='/'
                            className='hover:text-primary transition-colors'
                        >
                            Home
                        </Link>
                        <Link
                            to='/about'
                            className='hover:text-primary transition-colors'
                        >
                            About
                        </Link>
                        <Link
                            to='/community'
                            className='hover:text-primary transition-colors'
                        >
                            Community
                        </Link>
                        <Link
                            to='/generate'
                            className='hover:text-primary transition-colors'
                        >
                            Prompts
                        </Link>
                        <Link
                            to='/guides'
                            className='hover:text-primary transition-colors'
                        >
                            Guides
                        </Link>
                        <Link
                            to='/weekly-challenge'
                            className='hover:text-primary transition-colors'
                        >
                            Weekly Challenge
                        </Link>
                        <Link
                            to='/write-in-peace'
                            className='hover:text-primary transition-colors'
                        >
                            Write in Peace
                        </Link>
                    </nav>

                    {/* Action Buttons */}
                    <div className='flex gap-4'>
                        <Button asChild>
                            <Link to='/login'>Login</Link>
                        </Button>
                        <Button variant='outline' asChild>
                            <Link
                                to='/cart'
                                className='flex items-center gap-2'
                            >
                                <FaShoppingCart className='w-4 h-4' />
                                Cart
                            </Link>
                        </Button>
                    </div>

                    <div className='text-sm text-gray-400 text-center'>
                        &copy; {new Date().getFullYear()} Cove. All rights
                        reserved.
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <div className='absolute bottom-8 right-8'>
                <Button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className='flex items-center gap-2'
                    size='sm'
                >
                    <FiArrowUp className='w-4 h-4' />
                    Back to Top
                </Button>
            </div>
        </div>
    );
};

export default FooterCard;
