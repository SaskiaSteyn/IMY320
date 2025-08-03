import Block from '../components/block.jsx';
import Header from '../components/header.jsx';

function About() {
    return (
        <div className='bg-[#1E1E1E]'>
            <Header />

            {/* Main Content Container */}
            <div className='pt-20 px-8 pb-16'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-center pb-12 pt-5'>Get to know us!</h1>
                    {/* Team Members Section */}
                    <div className='flex gap-6 mb-12 h-150'>
                        <Block
                            size='1'
                            frontHeader='Johan.'
                            backHeader='Johan Jansen van Rensburg'
                            content='As a final-year Multimedia student, I have developed a skillset in full-stack development. My
degree has given me more experience in UX and front-end development, giving me a userfocused approach to designing and developing products. I am proficient in JavaScript,
NodeJS, React, Figma and the Adobe Creative Cloud suite of applications to create assets for
wireframes, mockups, and assets for projects I am working on. My passion lies in transforming
user-driven designs into a complete product.'
                            image='/images/team/johan.jpg'
                            color='#4E1F08'
                            textColor='white'
                        />
                        <Block
                            size='1'
                            frontHeader='Rori.'
                            backHeader='Rorisang Manamela'
                            content='I am a third-year Multimedia student seeking work experience as a programmer, graphic designer and web designer. Skilled at designing and building well-designed, functional websites and creating graphic art. Strong understanding of multimedia, languages, communication, social media and design.

As a creative problem-solver, I enjoy tackling complex design challenges and translating client visions into digital reality. My background in multimedia gives me a unique perspective on how different media types can work together to create engaging, interactive experiences that resonate with users across various platforms.'
                            image='/images/team/rori.jpg'
                            color='#E79210'
                            textColor='black'
                        />
                        <Block
                            size='1'
                            frontHeader='Saskia.'
                            backHeader='Saskia Steyn'
                            content='Saskia blends creativity, communication, and tech skills as a project manager. With a BA in Languages, she started in admin before moving into digital marketing at a PR firm, where her storytelling skills as a published writer shone.

Drawn to coding and design, she is pursuing a BIS Multimedia degree. While still maintaining a PR position where she built up experience managing everything from PR campaigns to full website builds. Now a freelance web developer and designer, she crafts secure, user-friendly digital experiences with a strong focus on UX/UI. Her attention to detail and leadership make her a standout on any tech team.'
                            image='/images/team/saskia.jpg'
                            color='#7D7F49'
                            textColor='black'
                        />
                    </div>
                    {/* <h1 className='text-4xl font-bold text-center mb-12 text-white'>
                        About Cove
                    </h1> */}

                    {/* Top Bento Grid - Main Story and Side Blocks */}
                    <div className='grid grid-cols-3 grid-rows-2 gap-6 mb-6 h-[24rem] w-full'>
                        {/* Our Story - Large block (2x2) */}
                        <div className='col-span-2 row-span-2 bg-[#D2C198] rounded-lg p-8 hover:bg-[#D2C198]/90 transition-colors flex flex-col justify-center'>
                            <h2 className='text-3xl font-bold mb-6 text-black'>
                                Our Story
                            </h2>
                            <p className='text-black leading-relaxed mb-4'>
                                Cove is the creation of a trio of young
                                university students who came together to make
                                something we felt was missing from the internet:
                                a cozy space for people who love writing, just
                                for the fun of it. Like many of you, we write in
                                notebooks, in messy docs, between classes or
                                late at night when ideas won't let us sleep.
                            </p>
                            <p className='text-black leading-relaxed'>
                                We believe that writing should be a joy, not a
                                burden. Whether you're crafting your first poem,
                                working on a novel, or simply journaling your
                                thoughts, every word matters. Our vision was to
                                create a digital sanctuary where writers could
                                focus on what they love most—the pure act of
                                creation—without the distractions of metrics,
                                algorithms, or the pressure to perform.
                            </p>
                        </div>

                        {/* Our Mission - Top right */}
                        <div className='col-span-1 row-span-2 bg-[#E79210] rounded-lg p-6 hover:bg-[#E79210]/90 transition-colors flex flex-col justify-between'>
                            <div>
                                <h3 className='text-xl font-bold mb-3 text-black'>
                                    Our Mission
                                </h3>
                                <p className='text-sm leading-relaxed text-black/80'>
                                    We wanted a place that didn't feel like a
                                    publishing platform or a competition—just
                                    somewhere you could write, explore ideas,
                                    and enjoy the process. While browsing
                                    writing tools and communities, we kept
                                    running into the same issue: everything felt
                                    a little too cold, too polished, too focused
                                    on productivity or publishing.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Logo and Welcome */}
                    <div className='grid grid-cols-2 gap-6 h-40 w-full mb-6'>
                        {/* Logo Block */}
                        <div className='col-span-1 row-span-1 bg-[#7D7F49] rounded-lg p-6 hover:bg-[#7D7F49]/90 transition-colors flex flex-col justify-between'>
                            <div>
                                <h3 className='text-xl font-bold mb-3 text-black'>
                                    What We Built
                                </h3>
                                <p className='text-sm leading-relaxed text-black/80'>
                                    We decided to build it ourselves, using the
                                    skills we had and learning the rest as we
                                    went. This site is the result—a project
                                    built from our love of writing and our
                                    desire to make the creative process more
                                    accessible and enjoyable. We're not a
                                    company, and we're not trying to sell you
                                    anything.
                                </p>
                            </div>
                        </div>

                        {/* Welcome Message */}
                        <div className='bg-[#4E1F08] rounded-lg p-6 hover:bg-[#4E1F08]/90 transition-all duration-300 flex flex-col justify-center border border-white/10'>
                            <div>
                                <h3 className='text-xl font-bold mb-3 text-white'>
                                    Welcome Home
                                </h3>
                                <p className='text-sm leading-relaxed text-white/80'>
                                    We're just three friends who wanted a better
                                    place to write, and we hope it becomes a
                                    space you'll want to return to, whether
                                    you're working on your tenth novel or your
                                    first sentence. Come as you are. Write what
                                    you want. And if you stick around,
                                    welcome—you're part of it now.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Content Section - Three More Blocks */}
                    <div className='grid grid-cols-3 grid-rows-2 gap-6 mb-6 h-[35rem] w-full py-8'>
                        {/* Community Block */}
                        <div className='col-span-1 row-span-2 bg-[#D2C198] rounded-lg hover:bg-[#D2C198]/90 transition-colors flex flex-col justify-center'>
                            <img
                                src='/images/chill-reading.jpeg'
                                alt='Cozy reading space'
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>

                        {/* Support Block */}
                        <div className='col-span-1 row-span-1 bg-[#D2C198] rounded-lg p-8 hover:bg-[#D2C198]/90 transition-colors flex flex-col justify-center'>
                            <div>
                                <h3 className='text-xl font-bold mb-3 text-black'>
                                    Our Community
                                </h3>
                                <p className='text-sm leading-relaxed text-black/80'>
                                    Everyone has a story to tell. Our community
                                    is a place where anyone can learn, teach and
                                    enjoy writing together, no matter their
                                    background or expertise.
                                </p>
                            </div>
                        </div>

                        {/* Sanctuary Block */}
                        <div className='col-span-1 row-span-1 bg-[#222600] rounded-lg p-8 hover:bg-[#222600]/90 transition-colors flex flex-col justify-center'>
                            <div>
                                <h3 className='text-xl font-bold mb-3 text-white'>
                                    Your Sanctuary
                                </h3>
                                <p className='text-sm leading-relaxed text-white/80'>
                                    In this busy world, having a quiet place
                                    with no distractions is rare, but valuable.
                                    We want to give you that space, a comfy
                                    corner of the world with just you and your
                                    words.
                                </p>
                            </div>
                        </div>
                        {/* Support Block */}
                        <div className='col-span-1 row-span-1 bg-[#BAC7CB] rounded-lg p-8 hover:bg-[#BAC7CB]/90 transition-colors flex flex-col justify-center'>
                            <div>
                                <h3 className='text-xl font-bold mb-3 text-black'>
                                    Creative Support
                                </h3>
                                <p className='text-sm leading-relaxed text-black'>
                                    From prompts that kick-start great ideas, to
                                    guides on how to make your stories come to
                                    life - we believe in supporting writers all
                                    through their entire creative journey.
                                </p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className='col-span-1 row-span-1 bg-[#D2C198] rounded-lg hover:bg-[#D2C198]/90 transition-colors overflow-hidden'>
                            <img
                                src='images/Cove-logo-landing.png'
                                alt='Cozy reading space'
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
