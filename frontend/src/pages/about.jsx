import { Link } from 'react-router-dom';

function About() {
    return (
        <div className='min-h-screen p-8'>
            <h1>Coming Soon!</h1>
            <p>Watch the space to learn more about us!</p>
            <Link to='/' className='cta-button mt-6'>
                Back to Home
            </Link>
        </div>
    );
}

export default About;
