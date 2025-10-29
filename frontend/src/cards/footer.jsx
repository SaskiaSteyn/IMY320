import { FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AuthButton from '../components/auth-button.jsx';
import CartButton from '../components/cart-button.jsx';
import { Button } from '../components/ui/button-header.jsx';

const FooterCard = ({ zIndex }) => {
    return (
        <div
            className=' w-full relative bg-black border-t border-[#525252] flex items-center justify-center text-white'
            style={{ zIndex }}
        >
            <style jsx>{`
                .animated-link {
                    position: relative;
                    display: inline-block;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .animated-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #e79210;
                    transition: width 0.3s ease;
                }
                .animated-link:hover::after {
                    width: 100%;
                }
                .animated-link:hover {
                    color: #e79210;
                }
            `}</style>
            <div className='container mx-auto px-8 py-16'>
                <div className='flex flex-col items-center gap-12'>
                    {/* Logo */}
                    <div>
                        <img
                            src='/images/cove-logo-footer.png'
                            alt='Cove Logo'
                            className='h-20 object-contain'
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className='flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-center'>
                        <Link to='/' className='animated-link'>
                            Home
                        </Link>
                        <span className='text-gray-500'>|</span>
                        <Link to='/about' className='animated-link'>
                            About
                        </Link>
                        <span className='text-gray-500'>|</span>
                        {/* <Link to='/community' className='animated-link'>
                            Community
                        </Link> */}
                        {/* <span className='text-gray-500'>|</span>
                        <Link to='/generate' className='animated-link'>
                            Prompts
                        </Link>
                        <span className='text-gray-500'>|</span>
                        <Link to='/guides' className='animated-link'>
                            Guides
                        </Link>
                        <span className='text-gray-500'>|</span>
                        <Link to='/weekly-challenge' className='animated-link'>
                            Weekly Challenge
                        </Link>
                        <span className='text-gray-500'>|</span> */}
                        <Link to='/write-in-peace' className='animated-link'>
                            Write in Peace
                        </Link>
                        <span className='text-gray-500'>|</span>
                        <Link to='/products' className='animated-link'>
                            Shop Merch
                        </Link>
                    </nav>

                    {/* Action Buttons */}
                    <div className='flex gap-4'>
                        <CartButton variant='outline' className='relative' />
                        <AuthButton />
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
