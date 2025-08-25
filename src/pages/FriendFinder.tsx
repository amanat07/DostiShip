import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FriendFinder = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Hero Section */}
          <div className="relative mb-12">
            {/* Floating Elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute -top-5 -right-5 w-16 h-16 bg-accent/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute -bottom-5 left-1/3 w-12 h-12 bg-secondary/40 rounded-full animate-pulse delay-500"></div>
            
            {/* Main Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-scale-in">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
                Friend Finder
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in delay-200">
                Discover amazing friends who share your passions
              </p>
              
              <div className="flex flex-col items-center gap-6">
                <Card className="p-8 bg-background/80 backdrop-blur-sm border-primary/20 shadow-card animate-scale-in delay-300">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Heart className="w-6 h-6 text-primary animate-pulse" />
                    <span className="text-lg text-muted-foreground">Connect through shared interests</span>
                    <Heart className="w-6 h-6 text-primary animate-pulse delay-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Movies
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Coding
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Gaming
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Music
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Sports
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Art
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Travel
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Food
                    </div>
                  </div>
                  
                  <Link to="/friend-suggestions">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="text-lg px-8 py-6 shadow-glow hover:shadow-primary animate-fade-in delay-500"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Find Friends
                      <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </Card>
                
                <div className="text-center text-muted-foreground animate-fade-in delay-700">
                  <p className="text-sm">Join thousands of students making meaningful connections</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background"></div>
                      <div className="w-8 h-8 bg-gradient-secondary rounded-full border-2 border-background"></div>
                      <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                    </div>
                    <span className="text-xs">2,847+ active members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FriendFinder;