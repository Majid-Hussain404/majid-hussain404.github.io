import { useState } from 'react';
import Background from './components/Background.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ResumeDrawer from './components/ResumeDrawer.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState(null);

  const openResume = (section) => setActiveSection(section);
  const closeResume = () => setActiveSection(null);

  return (
    <>
      <Background />
      <div className="site-viewport">
        <Header onOpenSection={openResume} />
        <Hero onOpenResume={openResume} />
        <Footer />
      </div>
      <ResumeDrawer section={activeSection} onClose={closeResume} />
    </>
  );
}
