import { useState, useEffect } from 'react';
import Preloader from './components/common/Preloader/Preloader';
import CustomCursor from './components/common/CustomCursor/CustomCursor';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero/Hero';
import MarqueeBand from './components/common/MarqueeBand/MarqueeBand';
import About from './components/sections/About/About';
import Catalog from './components/sections/Catalog/Catalog';
import Envases from './components/sections/Envases/Envases';
import GiftBoxes from './components/sections/GiftBoxes/GiftBoxes';
import Testimonials from './components/sections/Testimonials/Testimonials';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <CustomCursor />
      <Layout>
        <Hero />
        <MarqueeBand />
        <About />
        <Catalog />
        <Envases />
        <GiftBoxes />
        <Testimonials />
      </Layout>
    </>
  );
};

export default App;
