import AboutCove from './components/bentos/about-cove.jsx';
import Header from './components/header.jsx';
import Banner from './components/ui/banner.jsx';
import HeroImage from './components/ui/hero-image.jsx';
import './global.css';

function App() {
    return (
        <div className='relative'>
            <Header />
            <HeroImage />
            <AboutCove />
            <Banner
                height='60vh'
                backgroundImage='/images/new/Background.png'
                middleImage='/images/new/Typing.png'
                foregroundImage='/images/new/computer.png'
            />
            <AboutCove />
        </div>
    );
}

export default App;
