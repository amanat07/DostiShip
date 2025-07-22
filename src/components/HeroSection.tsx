import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-friendship.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">
            Join{" "}
            <span className="text-black dark:text-white">
              Dostiशिप
            </span>
            {" "}Today!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded people, share your experiences, and grow together in a supportive community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="accent" size="lg" className="text-lg px-8 py-6 h-auto">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>500+ Active Members</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Safe Community</span>
          </div>
          <div className="flex items-center gap-2">
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