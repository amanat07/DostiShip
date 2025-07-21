import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Shield, Users, Settings, Heart } from "lucide-react";

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn how to create your profile and start making friends",
      articles: ["Creating your profile", "Finding friends", "Safety tips", "Community guidelines"]
    },
    {
      icon: MessageCircle,
      title: "Messaging & Chat",
      description: "Everything about connecting and chatting with friends",
      articles: ["Sending messages", "Voice & video calls", "File sharing", "Group conversations"]
    },
    {
      icon: Heart,
      title: "Hangouts & Events",
      description: "Learn about virtual hangout rooms and events",
      articles: ["Creating hangout rooms", "Joining events", "Study groups", "Virtual activities"]
    },
    {
      icon: Shield,
      title: "Safety & Privacy",
      description: "Stay safe and protect your privacy on Dostiशिप",
      articles: ["Privacy settings", "Blocking users", "Reporting issues", "Account security"]
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your account and preferences",
      articles: ["Profile settings", "Notification preferences", "Account deletion", "Password reset"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl opacity-90 mb-8">Find answers to your questions about Dostiशिप</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10 bg-white text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Help Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a href="#" className="text-primary hover:underline text-sm">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8">
            Can't find what you're looking for? Our support team is here to help you.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Contact Support</Button>
            <Button variant="outline" size="lg">Live Chat</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;