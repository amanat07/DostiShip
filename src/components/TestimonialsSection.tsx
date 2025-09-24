import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "College Student",
    content: "Dostiशिप helped me find my study group and lifelong friends. The community is so welcoming and supportive!",
    rating: 5,
    avatar: "PS"
  },
  {
    name: "Rahul Verma",
    role: "Final Year Student",
    content: "I was shy and had trouble making friends. This platform made it so much easier to connect with like-minded people.",
    rating: 5,
    avatar: "RV"
  },
  {
    name: "Ananya Gupta",
    role: "Postgraduate",
    content: "The smart matching feature is incredible. I found friends who share my interests in photography and travel.",
    rating: 5,
    avatar: "AG"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Join Our Growing{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of something amazing from the beginning
          </p>
        </div>

        <div className="text-center">
          <div className="bg-gradient-primary/10 backdrop-blur-sm border border-primary/30 rounded-2xl p-12 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto flex items-center justify-center shadow-glow">
                <Heart className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground">Ready to Launch!</h3>
              
              <p className="text-muted-foreground text-lg">
                Dostiशिप is launching soon and we're excited to help you build meaningful friendships. 
                Be among the first to experience our innovative platform designed specifically for students.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Launching Soon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Student-Focused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary-glow rounded-full"></div>
                    <span>Safe & Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;