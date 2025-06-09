import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
// import ClientVideoSection from '@/components/ClientVideoSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import PasswordStrengthChecker from '../components/PasswordStrengthChecker';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <HeroSection />

      <FeaturesSection />

      <PasswordStrengthChecker />

      <PricingSection />

      {/* <ClientVideoSection 
        videoId="dQw4w9WgXcQ" // Replace with your actual tutorial video ID
        title="Master Our Platform in Minutes"
        description="Watch this quick tutorial to see how our platform can transform your workflow"
      /> */}
      
      <AboutSection />

      <TestimonialsSection />

      <FaqSection />

      <ContactSection />

      <Footer />

    </main>
  );
}
