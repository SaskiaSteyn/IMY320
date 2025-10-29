const TestimonialBlock = ({ testimonial }) => {
    return (
        <div className='flex-1 rounded-lg p-4 bg-[#d2d1d6]/100 hover:bg-[#d2d1d6]/90 transition-colors shadow-lg relative pt-12'>
            <img
                src={testimonial?.picture}
                alt={`${testimonial?.username} profile`}
                className='w-16 h-16 rounded-full object-cover border-4 border-[#19191a] shadow-lg absolute -top-8 left-1/2 transform -translate-x-1/2'
            />
            <div className='text-center pt-2'>
                <div className='flex justify-center text-[#e79210] mb-3'>
                    {'★★★★★'.split('').map((star, i) => (
                        <span key={i} className='text-sm'>
                            {star}
                        </span>
                    ))}
                </div>
                <blockquote className='text-black text-sm leading-relaxed mb-3 line-clamp-3'>
                    "{testimonial?.text}"
                </blockquote>
                <cite className='text-gray-700 text-xs font-medium not-italic'>
                    — {testimonial?.username}
                </cite>
            </div>
        </div>
    );
};

export default TestimonialBlock;
