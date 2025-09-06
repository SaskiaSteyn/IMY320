//a component that uses a grid to layout the cards in a 1-2-1 layout with images and text
import { ImageCard } from '../ui/card';

const Team = () => {
    return (
        <div
            className='relative w-full'
            style={{
                backgroundColor: '#19191a',
            }}
        >
            <div className='max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='m-10 text-center text-3xl text-white font-bold'>
                    <h1>Meet the Cove. team</h1>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-8 h-full min-h-[60vh]'>
                    {/* First Column*/}
                    <ImageCard
                        image='/images/team/johan.png'
                        title='Johan'
                        text='As a final-year Multimedia student, I have developed a skillset in full-stack development. My degree has given me more experience in UX and front-end development, giving me a userfocused approach to designing and developing products.'
                    />

                    {/* Second Column */}
                    <ImageCard
                        title='Rorisang'
                        image='/images/team/rori.png'
                        text='I am a third-year Multimedia student seeking work experience as a programmer, graphic designer and web designer. Skilled at designing and building well-designed, functional websites and creating graphic art. Strong understanding of multimedia, languages, communication, social media and design.'
                    />
                    {/* Third Column  */}
                    <ImageCard
                        title='Saskia'
                        image='/images/team/saskia.png'
                        text='Saskia blends creativity, communication, and tech skills as a project manager. With a BA in Languages, she started in admin before moving into digital marketing at a PR firm, where her storytelling skills as a published writer shone.'
                    />
                </div>
            </div>
        </div>
    );
};

export default Team;
