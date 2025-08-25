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
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground">
            Join{" "}
            <span className="text-neon font-extrabold animate-glow-pulse">
              Dostiशिप
            </span>
            {" "}Today!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded people in a <span className="text-primary-glow">futuristic</span> community. 
            Share experiences and grow together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <Button asChild variant="hero" size="lg" className="text-lg px-10 py-7 h-auto shadow-primary hover:shadow-glow">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="neon" size="lg" className="text-lg px-10 py-7 h-auto">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card/20 backdrop-blur-sm border border-primary/20">
            <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse"></div>
            <span>500+ Active Members</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card/20 backdrop-blur-sm border border-accent/20">
            <div className="w-3 h-3 bg-accent rounded-full animate-glow-pulse"></div>
            <span>Safe Community</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card/20 backdrop-blur-sm border border-secondary/20">
            <div className="w-3 h-3 bg-secondary rounded-full animate-glow-pulse"></div>
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