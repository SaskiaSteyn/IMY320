import ChevronDown from '../components/chevron-down.jsx';

const TestimonialsCard = ({ testimonials, zIndex }) => {
    return (
        <div
            className='h-screen w-full relative card-section bg-[#1E1E1E]'
            style={{ zIndex }}
        >
            <div className='p-8 h-full flex flex-col justify-center'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-white'>
                        What Writers Say
                    </h2>
                </div>

                {/* Testimonials Flexbox Layout */}
                <div className='flex flex-col gap-8 mx-auto max-w-6xl h-3/5'>
                    {/* Top row */}
                    <div className='flex gap-6 flex-1 mt-8'>
                        {/* Jordan M */}
                        <div className='flex-1 bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-lg relative pt-12'>
                            <img
                                src={testimonials[0]?.picture}
                                alt={`${testimonials[0]?.username} profile`}
                                className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
                            />
                            <div className='text-center pt-2'>
                                <div className='flex justify-center text-yellow-400 mb-3'>
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i} className='text-sm'>
                                            {star}
                                        </span>
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3'>
                                    "{testimonials[0]?.text}"
                                </blockquote>
                                <cite className='text-gray-600 text-xs font-medium not-italic'>
                                    — {testimonials[0]?.username}
                                </cite>
                            </div>
                        </div>

                        {/* Sarah K */}
                        <div className='flex-1 bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-lg relative pt-12'>
                            <img
                                src={testimonials[1]?.picture}
                                alt={`${testimonials[1]?.username} profile`}
                                className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
                            />
                            <div className='text-center pt-2'>
                                <div className='flex justify-center text-yellow-400 mb-3'>
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i} className='text-sm'>
                                            {star}
                                        </span>
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3'>
                                    "{testimonials[1]?.text}"
                                </blockquote>
                                <cite className='text-gray-600 text-xs font-medium not-italic'>
                                    — {testimonials[1]?.username}
                                </cite>
                            </div>
                        </div>

                        {/* Michelle R */}
                        <div className='flex-1 bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-lg relative pt-12'>
                            <img
                                src={testimonials[2]?.picture}
                                alt={`${testimonials[2]?.username} profile`}
                                className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
                            />
                            <div className='text-center pt-2'>
                                <div className='flex justify-center text-yellow-400 mb-3'>
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i} className='text-sm'>
                                            {star}
                                        </span>
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3'>
                                    "{testimonials[2]?.text}"
                                </blockquote>
                                <cite className='text-gray-600 text-xs font-medium not-italic'>
                                    — {testimonials[2]?.username}
                                </cite>
                            </div>
                        </div>
                    </div>

                    {/* Bottom row */}
                    <div className='flex gap-6 flex-1'>
                        {/* Alex T */}
                        <div className='flex-1 bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-lg relative pt-12'>
                            <img
                                src={testimonials[3]?.picture}
                                alt={`${testimonials[3]?.username} profile`}
                                className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
                            />
                            <div className='text-center pt-2'>
                                <div className='flex justify-center text-yellow-400 mb-3'>
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i} className='text-sm'>
                                            {star}
                                        </span>
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3'>
                                    "{testimonials[3]?.text}"
                                </blockquote>
                                <cite className='text-gray-600 text-xs font-medium not-italic'>
                                    — {testimonials[3]?.username}
                                </cite>
                            </div>
                        </div>

                        {/* David L */}
                        <div className='flex-1 bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-lg relative pt-12'>
                            <img
                                src={testimonials[4]?.picture}
                                alt={`${testimonials[4]?.username} profile`}
                                className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
                            />
                            <div className='text-center pt-2'>
                                <div className='flex justify-center text-yellow-400 mb-3'>
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i} className='text-sm'>
                                            {star}
                                        </span>
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3'>
                                    "{testimonials[4]?.text}"
                                </blockquote>
                                <cite className='text-gray-600 text-xs font-medium not-italic'>
                                    — {testimonials[4]?.username}
                                </cite>
                            </div>
                        </div>

                        {/* Marcus Chen */}
                        <div className='flex-1 bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-lg relative pt-12'>
                            <img
                                src={testimonials[5]?.picture}
                                alt={`${testimonials[5]?.username} profile`}
                                className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
                            />
                            <div className='text-center pt-2'>
                                <div className='flex justify-center text-yellow-400 mb-3'>
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i} className='text-sm'>
                                            {star}
                                        </span>
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3'>
                                    "{testimonials[5]?.text}"
                                </blockquote>
                                <cite className='text-gray-600 text-xs font-medium not-italic'>
                                    — {testimonials[5]?.username}
                                </cite>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Chevron */}
            <ChevronDown />
        </div>
    );
};

export default TestimonialsCard;
