import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Search, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const FindingFriends = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/help-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Finding Friends</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Discover and connect with like-minded people in your area
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search & Discovery
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Find friends through various discovery methods:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Interest-based matching:</strong> Connect with people who share your hobbies</li>
                    <li><strong>Location proximity:</strong> Find friends nearby or at your university</li>
                    <li><strong>Study groups:</strong> Join academic groups in your field</li>
                    <li><strong>Event participation:</strong> Meet people at virtual hangouts</li>
                    <li><strong>Mutual connections:</strong> Connect through friends of friends</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Making Connections
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Best practices for reaching out:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Send personalized friend requests with a message</li>
                    <li>Mention common interests or connections</li>
                    <li>Be genuine and friendly in your approach</li>
                    <li>Respect boundaries if someone doesn't respond</li>
                    <li>Engage with their posts before sending requests</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Local Communities
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Join local and university communities:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search for your university or college groups</li>
                    <li>Join city-based communities</li>
                    <li>Participate in local events and meetups</li>
                    <li>Connect with classmates and dormmates</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🤝 Building Lasting Friendships</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Start conversations about shared interests</li>
                  <li>• Be active in group discussions</li>
                  <li>• Suggest virtual coffee chats or study sessions</li>
                  <li>• Share experiences and support each other</li>
                  <li>• Be patient - good friendships take time to develop</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindingFriends;