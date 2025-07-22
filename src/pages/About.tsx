import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MessageCircle, Shield, GraduationCap, Heart, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dostiशिप
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At Dostiशिप, we believe that friendships are the foundation of happiness. 
            In today's fast-paced digital world, making meaningful connections can be 
            difficult—but we're here to change that!
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Who We Are</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are a passionate team dedicated to creating a safe, welcoming, and fun space 
              where people can meet, connect, and build lasting friendships. Our mission is to 
              bring individuals together, no matter where they are, and help them form genuine bonds.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Find Like-Minded Friends</h3>
              <p className="text-muted-foreground">
                Connect with people who share your interests, values, and passions.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Engaging Conversations</h3>
              <p className="text-muted-foreground">
                Join discussions, participate in group chats, and make every interaction meaningful.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Safe & Secure Community</h3>
              <p className="text-muted-foreground">
                Your privacy and security are our top priorities in our community.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <GraduationCap className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Senior Mentorship</h3>
              <p className="text-muted-foreground">
                Learn from seniors about career choices and real-world skills.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Vision</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We envision a world where no one feels alone. Everyone deserves a friend they can trust, 
            laugh with, and share life's journey. By fostering real connections, we aim to make the 
            world a friendlier, more connected place.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="p-8 text-center hover:shadow-glow transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-content">
                <span className="text-2xl font-bold text-white mx-auto">AT</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Atharav Tarika</h3>
              <p className="text-lg text-primary font-semibold mb-4">CEO & Founder</p>
              <p className="text-muted-foreground">
                Passionate about connecting people and building meaningful relationships in the digital age.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-glow transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-secondary rounded-full mx-auto mb-6 flex items-center justify-content">
                <span className="text-2xl font-bold text-accent-foreground mx-auto">AK</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Amanatpreet Kaur</h3>
              <p className="text-lg text-accent font-semibold mb-4">Co-Founder & CTO</p>
              <p className="text-muted-foreground">
                Guides DostiShip's tech development, ensuring smooth performance. An introvert who found making friends tough in college, she aims to simplify socializing for students.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">atharavtarika@dostiship.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Call</h3>
              <p className="text-muted-foreground">+91 9466903617</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-4 mt-2">
                <span className="text-muted-foreground">Instagram</span>
                <span className="text-muted-foreground">Facebook</span>
                <span className="text-muted-foreground">Twitter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-accent-foreground mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-accent-foreground mb-6">Join Us Today!</h2>
          <p className="text-xl text-accent-foreground/90 mb-8 leading-relaxed">
            Be a part of our growing community and start building friendships that truly matter. 
            Because every great friendship begins with a simple "hello"!
          </p>
          <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
            <Link to="/register">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;