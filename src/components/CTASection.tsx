import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-primary rounded-full"></div>
            <div className="absolute top-16 right-12 w-8 h-8 bg-accent rounded-full"></div>
            <div className="absolute bottom-12 left-16 w-12 h-12 border-2 border-accent rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-6 h-6 bg-primary rounded-full"></div>
          </div>

          <div className="relative z-10 p-12 text-center space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex justify-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="p-3 rounded-full bg-gradient-primary shadow-glow" style={{ animationDelay: '0.2s' }}>
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Ready to Make New{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Friends?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Be among the first to experience our revolutionary platform and find your perfect study buddy, 
                adventure partner, or lifelong friend through Dostiशिप.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6 h-auto group">
                <Link to="/register">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary-glow cursor-pointer transition-colors duration-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;