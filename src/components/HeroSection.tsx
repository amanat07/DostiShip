import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-friendship.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-12 px-6 max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in-up">
          <h1 className="text-8xl md:text-9xl font-bold text-foreground tracking-wider leading-none">
            <span className="text-primary font-black">
              DOSTIशिप
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Where friendship meets luxury. Connect with sophisticated minds, share premium experiences, and build lasting relationships in our exclusive community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <Button asChild variant="hero" size="lg" className="text-lg px-12 py-8 h-auto font-semibold tracking-wide">
            <Link to="/register">Join The Circle</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-12 py-8 h-auto font-medium tracking-wide border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/about">Discover More</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-12 text-sm text-muted-foreground animate-fade-in-up font-medium tracking-wider" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Exclusive Community</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Premium Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse"></div>
            <span>Meaningful Connections</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto"
        >
          <path
            d="M0,96 C360,48 720,48 1080,72 C1320,88 1440,96 1440,96 L1440,120 L0,120 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;