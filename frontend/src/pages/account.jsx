import { Link } from 'react-router-dom';

function Account() {
    return (
        <div className='min-h-screen p-8 flex flex-col items-center justify-center'>
            <h1>Coming Soon!</h1>
            <p>Watch the space to learn more about accessing your account!</p>
            <Link to='/' className='cta-button mt-6'>
                Back to Home
            </Link>
        </div>
    );
}

export default Account;
