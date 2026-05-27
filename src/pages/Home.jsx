import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Testimonial from '../components/Testimonial';
import About from '../components/About';
import ProgramsPreview from '../components/ProgramsPreview';
import Methodology from '../components/Methodology';
import SignaturePrograms from '../components/SignaturePrograms';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Testimonial />
        <About />
        <ProgramsPreview />
        <Methodology />
        <SignaturePrograms />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
