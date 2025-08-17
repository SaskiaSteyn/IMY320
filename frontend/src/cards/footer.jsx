import {FiShoppingCart} from 'react-icons/fi';
import {FiArrowUp} from 'react-icons/fi';
import {Link} from 'react-router-dom';

const FooterCard = ({zIndex}) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[var(--background)] flex items-center justify-center'
            style={{zIndex}}
        >
            <div className='w-full max-w-5xl mx-auto flex flex-col items-center gap-8 p-8'>
                {/* Logo */}
                <div>
                    <img
                        src='/images/cove-logo-footer.png'
                        alt='Cove Logo'
                        className='h-50 w-50 object-contain'
                    />
                </div>
                {/* Navigation Links */}
                <nav className='flex flex-wrap gap-6 justify-center text-lg'>
                    <Link to='/' className='hover:underline text-[var(--text)]'>
                        Home
                    </Link>
                    <Link
                        to='/about'
                        className='hover:underline text-[var(--text)]'
                    >
                        About
                    </Link>
                    <Link
                        to='/community'
                        className='hover:underline text-[var(--text)]'
                    >
                        Community
                    </Link>
                    <Link
                        to='/generate'
                        className='hover:underline text-[var(--text)]'
                    >
                        Prompts
                    </Link>
                    <Link
                        to='/guides'
                        className='hover:underline text-[var(--text)]'
                    >
                        Guides
                    </Link>
                    <Link
                        to='/weekly-challenge'
                        className='hover:underline text-[var(--text)]'
                    >
                        Weekly Challenge
                    </Link>
                    <Link
                        to='/write-in-peace'
                        className='hover:underline text-[var(--text)]'
                    >
                        Write in Peace
                    </Link>
                </nav>
                {/* Action Buttons */}
                <div className='flex gap-8 mt-16'>
                    <Link to='/login' className='cta-button w-30 mx-auto text-center'>
                        Login
                    </Link>
                    <Link to='/cart' className='cta-button w-30 mx-auto text-center'>
                        <span className='flex flex-row items-center gap-2'>
                            <FiShoppingCart className='w-5 h-5' />
                            Cart
                        </span>
                    </Link>
                </div>
                <div className='text-xs text-[var(--text)] opacity-60 mt-8'>
                    &copy; {new Date().getFullYear()} Cove. All rights reserved.
                </div>
            </div>
            {/* Back to Top Button - only inside footer */}
            <div className='absolute bottom-8 right-8'>
                <button
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className='flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-full shadow-lg hover:bg-[var(--accent)] transition-all font-bold'
                >
                    <FiArrowUp className='w-5 h-5' />
                    Back to Top
                </button>
            </div>
        </div>
    );
};

export default FooterCard;
