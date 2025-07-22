import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, MessageCircle, MapPin, Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your profile and tell us about your interests, hobbies, and what you're looking for in a friendship."
    },
    {
      icon: Users,
      title: "Find Your People",
      description: "Our smart matching algorithm connects you with like-minded students who share your interests and values."
    },
    {
      icon: MessageCircle,
      title: "Start Chatting",
      description: "Break the ice with conversation starters and get to know each other through our safe messaging platform."
    },
    {
      icon: MapPin,
      title: "Meet Nearby",
      description: "Discover friends in your area and see who's around you with our location-based features."
    },
    {
      icon: Calendar,
      title: "Join Activities",
      description: "Participate in virtual hangouts, study sessions, and events to build stronger connections."
    },
    {
      icon: Shield,
      title: "Stay Safe",
      description: "Enjoy peace of mind with our safety features, reporting tools, and community guidelines."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              How Dostiशिप Works
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Making meaningful friendships in college has never been easier. Follow these simple steps to start your journey.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who have already found their perfect study buddies and lifelong friends.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/register">Create Your Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;