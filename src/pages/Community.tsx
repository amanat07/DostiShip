import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, MessageCircle, Calendar, BookOpen, Music, Gamepad2, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const communityStats = [
    { number: "Soon", label: "Launch Date" },
    { number: "New", label: "Platform" },
    { number: "Safe", label: "Environment" },
    { number: "Free", label: "To Join" }
  ];

  const communityGroups = [
    {
      icon: BookOpen,
      title: "Study Buddies",
      description: "Find study partners for your courses and exam preparation",
      members: "Coming Soon"
    },
    {
      icon: Music,
      title: "Music Lovers",
      description: "Share your favorite music and discover new artists together",
      members: "Coming Soon"
    },
    {
      icon: Gamepad2,
      title: "Gaming Squad",
      description: "Connect with fellow gamers for multiplayer sessions and tournaments",
      members: "Coming Soon"
    },
    {
      icon: Coffee,
      title: "Coffee Chats",
      description: "Casual conversations over coffee with like-minded students",
      members: "Coming Soon"
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
              Join Our Amazing Community
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of a vibrant community of students who support each other, share experiences, and create lasting friendships.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/register">Join the Community</Link>
            </Button>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Groups */}
        <section className="py-20 bg-card">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Popular Community Groups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {communityGroups.map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <group.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{group.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{group.members}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {group.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Community Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Respect</h3>
                <p className="text-muted-foreground">
                  We treat everyone with kindness and respect, celebrating our differences.
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Inclusivity</h3>
                <p className="text-muted-foreground">
                  Everyone is welcome regardless of background, interests, or experience.
                </p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Support</h3>
                <p className="text-muted-foreground">
                  We help each other grow, learn, and succeed in our academic and personal journeys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20 bg-card">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Regular Community Events
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our weekly study sessions, monthly social events, and special celebrations throughout the year.
            </p>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/hangout">View Upcoming Events</Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Make New Friends?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our revolutionary platform designed to help students build meaningful friendships.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;