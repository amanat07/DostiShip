import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FriendFinderSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-pulse">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <Sparkles className="w-6 h-6 text-primary animate-bounce" />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary/20 blur-3xl rounded-full transform scale-150"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent drop-shadow-2xl">
              <span className="inline-block animate-pulse">Find Your Perfect</span>
              <span className="block bg-primary/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-primary/30 shadow-glow mt-2">Study Buddy</span>
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded students who share your interests and passions. 
            Build lasting friendships through shared activities and experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="space-y-6">
            <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Shared Interests</h3>
                  <p className="text-muted-foreground text-sm">
                    Match with people who love the same movies, games, music, and hobbies as you
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Matching</h3>
                  <p className="text-muted-foreground text-sm">
                    Our algorithm finds the best matches based on compatibility and common ground
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Safe Community</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect in a verified, student-only environment with safety measures in place
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - CTA */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-primary/10 backdrop-blur-sm border-primary/30 shadow-glow">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex -space-x-2 justify-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full border-2 border-background shadow-lg"></div>
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full border-2 border-background shadow-lg"></div>
                    <div className="w-12 h-12 bg-accent rounded-full border-2 border-background shadow-lg"></div>
                    <div className="w-12 h-12 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-bold">+50</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">2,847+ students already connected</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Ready to Make Friends?</h3>
                  <p className="text-muted-foreground">
                    Join our community and start building meaningful connections today
                  </p>
                </div>

                <Link to="/login" state={{ redirectTo: '/friend-finder' }}>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="text-lg px-8 py-6 shadow-glow hover:shadow-primary group"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Find Friends
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <p className="text-xs text-muted-foreground">
                  Need an account? <Link to="/register" state={{ redirectTo: '/friend-finder' }} className="text-primary hover:underline">Sign up here</Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendFinderSection;