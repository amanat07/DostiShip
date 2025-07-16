import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Calendar, MessageCircle, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Find Your Tribe",
    description: "Connect with students who share your interests, hobbies, and academic goals. Build meaningful friendships that last beyond university."
  },
  {
    icon: MapPin,
    title: "Campus Events",
    description: "Discover and join events happening around campus. From study groups to social gatherings, never miss out on the fun."
  },
  {
    icon: Calendar,
    title: "Plan Together",
    description: "Organize hangouts, study sessions, and adventures with your new friends. Our planning tools make coordination effortless."
  },
  {
    icon: MessageCircle,
    title: "Safe Communication",
    description: "Chat securely with built-in safety features. Report concerns and maintain a positive, respectful community environment."
  },
  {
    icon: Shield,
    title: "University Verified",
    description: "Only verified students from your university can join. We ensure a safe, authentic community of real students."
  },
  {
    icon: Sparkles,
    title: "Smart Matching",
    description: "Our algorithm suggests friends based on shared classes, interests, and campus involvement. Quality connections, not just quantity."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dostiship?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for university students, by university students. 
            Experience friendship-making like never before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-card transition-all duration-300 hover:scale-105 animate-scale-in bg-card/50 backdrop-blur-sm border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary w-fit group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;