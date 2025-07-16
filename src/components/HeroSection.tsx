import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-friendship.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-bounce-gentle">
        <Card className="p-4 shadow-card bg-card/80 backdrop-blur-sm">
          <Heart className="w-8 h-8 text-accent" />
        </Card>
      </div>
      
      <div className="absolute top-32 right-32 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
        <Card className="p-4 shadow-card bg-card/80 backdrop-blur-sm">
          <Users className="w-8 h-8 text-primary" />
        </Card>
      </div>
      
      <div className="absolute bottom-32 left-32 animate-bounce-gentle" style={{ animationDelay: '2s' }}>
        <Card className="p-4 shadow-card bg-card/80 backdrop-blur-sm">
          <MapPin className="w-8 h-8 text-accent" />
        </Card>
      </div>
      
      <div className="absolute bottom-20 right-20 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
        <Card className="p-4 shadow-card bg-card/80 backdrop-blur-sm">
          <Calendar className="w-8 h-8 text-primary" />
        </Card>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">
            Welcome to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dostiship
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your university's friendship hub. Connect, discover, and build lasting friendships with fellow students.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
            Get Started
          </Button>
          <Button variant="accent" size="lg" className="text-lg px-8 py-6 h-auto">
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>500+ Active Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>50+ Campus Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse"></div>
            <span>University Verified</span>
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