import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FriendFinderSection from "@/components/FriendFinderSection";
import subtleBg from "@/assets/subtle-abstract-bg.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-gradient-background relative"
      style={{
        backgroundImage: `url(${subtleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-background-overlay pointer-events-none opacity-70" />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <FriendFinderSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
