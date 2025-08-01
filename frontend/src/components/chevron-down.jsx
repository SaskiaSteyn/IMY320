function ChevronDown() {
    return (
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
            <svg
                className='w-8 h-8 text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                onClick={() =>
                    window.scrollBy({
                        top: window.innerHeight,
                        behavior: 'smooth',
                    })
                }
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
            </svg>
        </div>
    );
}

export default ChevronDown;
