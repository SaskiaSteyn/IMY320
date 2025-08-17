import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            let attempts = 0;
            const maxAttempts = 10;
            const interval = 100; // ms
            const scrollToHash = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(scrollToHash, interval);
                } else {
                    window.scrollTo(0, 0);
                }
            };
            scrollToHash();
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
