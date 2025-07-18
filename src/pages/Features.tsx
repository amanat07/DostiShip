import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, MessageCircle, Users, MapPin, Video, UserCheck, Calendar } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "In-App Journal",
      description: "Track your social journey with a private journal. Reflect on interactions, set connection goals, and celebrate milestones to boost confidence and personal growth."
    },
    {
      icon: MessageCircle,
      title: "Icebreaker Challenges",
      description: "Start conversations effortlessly with fun, guided prompts like \"What's your favorite study snack?\"—perfect for introverts to break the ice without stress."
    },
    {
      icon: Users,
      title: "Personality-Based Matching",
      description: "Find friends who truly get you through quizzes matching interests (e.g., anime, coding) and personality traits, ensuring authentic and compatible connections."
    },
    {
      icon: Video,
      title: "Virtual Hangout Spaces",
      description: "Join themed online rooms (e.g., Music Jam, Study Buddy) for low-pressure chats and activities, making bonding fun and comfortable from anywhere."
    },
    {
      icon: MapPin,
      title: "Interactive Map",
      description: "Discover nearby students with shared interests or moods on a real-time map, making it easy to plan spontaneous meetups or study sessions."
    },
    {
      icon: UserCheck,
      title: "Senior Mentorship",
      description: "Get personalized guidance from experienced seniors on academics, career paths, and college life through a unique skill-based mentorship system."
    },
    {
      icon: Calendar,
      title: "Community Meetups",
      description: "Attend curated virtual or in-person events, like study mixers or hobby clubs, to build lasting friendships in a safe, inclusive environment."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-24 pb-16 px-6 bg-gradient-hero">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover Amazing Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build meaningful friendships and connections in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/learn-more">Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;