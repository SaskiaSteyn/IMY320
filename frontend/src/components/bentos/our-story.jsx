//a component that uses a grid to layout the cards in a 1-2-1 layout with images and text
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const OurStory = () => {
    return (
        <div
            className='relative w-full'
            style={{
                backgroundColor: '#19191a',
            }}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-8 h-full min-h-[80vh]'>
                    {/* First Column - Spans 2 rows */}
                    <Card
                        className='lg:row-span-3'
                        backgroundImage='/images/new/writing.png'
                        title='Our Story'
                        text={[
                            "Cove is the creation of a trio of young university students who came together to make something we felt was missing from the internet: a cozy space for people who love writing, just for the fun of it. Like many of you, we write in notebooks, in messy docs, between classes or late at night when ideas won't let us sleep.",
                            "We believe that writing should be a joy, not a burden. Whether you're crafting your first poem, working on a novel, or simply journaling your thoughts, every word matters. Our vision was to create a digital sanctuary where writers could focus on what they love most—the pure act of creation—without the distractions of metrics, algorithms, or the pressure to perform.",
                        ]}
                    />

                    {/* Second Column - Row 1 */}
                    <Card
                        title='Our Mission'
                        backgroundImage=''
                        text="We wanted a place that didn't feel like a publishing platform or a competition—just somewhere you could write, explore ideas, and enjoy the process. While browsing writing tools and communities, we kept running into the same issue: everything felt a little too cold, too polished, too focused on productivity or publishing."
                    />

                    {/* Third Column - Spans 2 rows */}
                    <Card
                        // className='lg:row-span-2'
                        backgroundImage=''
                        title='What we Built'
                        text="We decided to build it ourselves, using the skills we had and learning the rest as we went. This site is the result—a project built from our love of writing and our desire to make the creative process more accessible and enjoyable. We're not a company, and we're not trying to sell you anything."
                    />

                    {/* Second Column - Row 2 */}
                    <Card
                        title='Welcome Home'
                        backgroundImage=''
                        text="We're just three friends who wanted a better place to write, and we hope it becomes a space you'll want to return to, whether you're working on your tenth novel or your first sentence. Come as you are. Write what you want. And if you stick around, welcome—you're part of it now."
                    />
                    <Card
                        title='Our Community'
                        backgroundImage=''
                        text='Everyone has a story to tell. Our community is a place where anyone can learn, teach and enjoy writing together, no matter their background or expertise.'
                    />
                    <Card
                        title='Your Sanctuary'
                        backgroundImage=''
                        text='In this busy world, having a quiet place with no distractions is rare, but valuable. We want to give you that space, a comfy corner of the world with just you and your words.'
                    />
                    <Card
                        title='Creative Support'
                        backgroundImage=''
                        text='From prompts that kick-start great ideas, to guides on how to make your stories come to life - we believe in supporting writers all through their entire creative journey.'
                    />
                </div>
            </div>
            <div className='flex justify-center pb-12'>
                <Link to='/write-in-peace#pricing'>
                    <Button className='mr-4'>Download the app</Button>
                </Link>
            </div>
        </div>
    );
};

export default OurStory;
