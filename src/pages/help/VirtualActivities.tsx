import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, Music, Film, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const VirtualActivities = () => {
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
                  <Gamepad2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Virtual Activities</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Engage in fun virtual activities with friends from anywhere
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Gaming Activities
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Play games together with friends:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Online multiplayer games and tournaments</li>
                    <li>Quiz competitions and trivia nights</li>
                    <li>Digital board games and card games</li>
                    <li>Puzzle solving challenges</li>
                    <li>Virtual escape rooms</li>
                    <li>Word games and brain teasers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  Entertainment
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Enjoy entertainment together:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Movie nights with synchronized viewing</li>
                    <li>Watch parties for TV shows and series</li>
                    <li>YouTube video sharing sessions</li>
                    <li>Virtual karaoke nights</li>
                    <li>Talent shows and performances</li>
                    <li>Comedy and entertainment nights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Creative Activities
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Express creativity together:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Music listening parties and DJ sessions</li>
                    <li>Digital art creation and sharing</li>
                    <li>Creative writing workshops</li>
                    <li>Photography challenges</li>
                    <li>Cooking and recipe sharing</li>
                    <li>Book clubs and reading groups</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  Social Activities
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Connect and socialize virtually:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Virtual coffee breaks and casual chats</li>
                    <li>Speed networking sessions</li>
                    <li>Cultural exchange and language practice</li>
                    <li>Fitness and workout sessions</li>
                    <li>Meditation and mindfulness groups</li>
                    <li>Virtual tours and travel experiences</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🌟 Activity Ideas</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Host themed nights (80s music, retro games)</li>
                  <li>• Create challenges and competitions</li>
                  <li>• Share screens for collaborative activities</li>
                  <li>• Use virtual backgrounds for fun themes</li>
                  <li>• Record special moments to share later</li>
                  <li>• Rotate hosting duties among friends</li>
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

export default VirtualActivities;