import FooterCard from '../cards/footer.jsx';
import OurStory from '../components/bentos/our-story.jsx';
import Team from '../components/bentos/team.jsx';
import Header from '../components/header.jsx';
import Banner from '../components/ui/banner.jsx';

function About() {
    return (
        <div className='bg-[var(--fog)]'>
            <Header />
            <Team />
            <Banner />
            <OurStory />
            <FooterCard />
        </div>
    );
}

export default About;
