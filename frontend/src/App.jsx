import FooterCard from './cards/footer.jsx';
import AboutCove from './components/bentos/about-cove.jsx';
import Products from './components/bentos/products.jsx';
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
            <Banner />
            <Products />
            <FooterCard />
        </div>
    );
}

export default App;
