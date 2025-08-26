import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Clock className="w-12 h-12 text-primary-foreground" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-primary animate-pulse" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            {title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            Coming Soon
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <p className="text-muted-foreground font-medium">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/contact">Notify Me</Link>
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="pt-8">
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="ml-2 font-medium">In Development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;