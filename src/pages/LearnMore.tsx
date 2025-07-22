import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

const LearnMore = () => {
  const benefits = [
    "Build authentic friendships based on shared interests",
    "Safe and secure environment for meaningful connections",
    "Personalized experience tailored to your preferences",
    "Access to mentorship from experienced seniors",
    "Virtual and in-person community events",
    "Advanced matching algorithms for compatible connections"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-24 pb-16 px-6 bg-gradient-hero">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" size="sm">
              <Link to="/features" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Features
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Dostiशिप?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More than just a social platform - we're your gateway to meaningful connections and lasting friendships
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">What Makes Us Different</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Dostiशिप, we believe that genuine connections are the foundation of happiness. Our platform is designed to break down the barriers that prevent meaningful friendships from forming in today's digital age.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Whether you're looking for study partners, hobby enthusiasts, or just someone to share life's moments with, we provide the tools and environment to make it happen naturally and safely.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to="/register">Join Our Community</Link>
              </Button>
            </Card>
          </div>

          <div className="text-center">
            <Card className="p-8 bg-primary/5">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of students who have already found their perfect friend group through Dostiशिप
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/features">Explore Features</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/community">Join Our Community</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnMore;