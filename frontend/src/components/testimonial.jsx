const Testimonial = ({ picture, text, username, className = '' }) => {
    return (
        <div
            className={`testimonial-card bg-[#D2C198] rounded-lg p-8 flex items-center gap-6 max-w-4xl mx-auto transition-all duration-500 ease-in-out ${className}`}
        >
            {/* Profile Picture */}
            <div className='flex-shrink-0'>
                <img
                    src={picture}
                    alt={`${username} profile`}
                    className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105'
                />
            </div>

            {/* Testimonial Content */}
            <div className='flex-1'>
                {/* Quote Text */}
                <blockquote className='text-gray-800 text-lg md:text-xl leading-relaxed mb-4'>
                    "{text}"
                </blockquote>

                {/* Author Attribution */}
                <cite className='text-gray-600 text-base font-medium not-italic'>
                    — {username}
                </cite>
            </div>
        </div>
    );
};

export default Testimonial;
