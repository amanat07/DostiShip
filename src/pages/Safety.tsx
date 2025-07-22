import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, AlertTriangle, Lock, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Profile Verification",
      description: "All users go through a verification process to ensure authentic profiles and maintain community trust."
    },
    {
      icon: Eye,
      title: "Privacy Controls",
      description: "You control who can see your profile, contact you, and access your information with granular privacy settings."
    },
    {
      icon: AlertTriangle,
      title: "Report & Block",
      description: "Easily report inappropriate behavior or block users who make you uncomfortable with one-click tools."
    },
    {
      icon: Lock,
      title: "Secure Messaging",
      description: "All conversations are encrypted and monitored for harmful content to keep your chats safe."
    },
    {
      icon: Users,
      title: "Community Moderation",
      description: "Our dedicated moderation team reviews reports and takes swift action against policy violations."
    },
    {
      icon: Phone,
      title: "Emergency Support",
      description: "24/7 support team available to help with any safety concerns or urgent issues."
    }
  ];

  const safetyTips = [
    "Keep personal information private until you build trust",
    "Meet in public places for first-time meetups",
    "Trust your instincts - if something feels off, report it",
    "Don't share financial information or send money",
    "Use the in-app messaging before sharing contact details",
    "Report any suspicious or inappropriate behavior immediately"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We've built comprehensive safety features and guidelines to ensure you can make friends with confidence and peace of mind.
            </p>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Safety Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safetyFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-20 bg-card">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Safety Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-primary-foreground text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Need Help or Have Concerns?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our support team is here to help. Don't hesitate to reach out if you need assistance or want to report something.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                <Link to="/help-center">Help Center</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;