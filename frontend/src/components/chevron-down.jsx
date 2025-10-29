function ChevronDown({
    backgroundColor = 'transparent',
    textColor = '#d1d6d7',
}) {
    function handleScroll() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    }

    return (
        <div
            onClick={() => handleScroll()}
            className='chev-bg opacity-70 hover:opacity-100 absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2 rounded-full border-2'
            style={{ backgroundColor, borderColor: textColor }}
        >
            <svg
                className='w-5 h-5 transition-opacity cursor-pointer'
                fill='none'
                stroke={textColor}
                viewBox='0 0 24 24'
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
