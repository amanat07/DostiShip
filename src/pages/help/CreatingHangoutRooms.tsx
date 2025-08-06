import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Calendar, Lock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CreatingHangoutRooms = () => {
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
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Creating Hangout Rooms</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Set up virtual spaces for casual conversations and activities
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  What are Hangout Rooms?
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Hangout rooms are virtual spaces where you can:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Have casual video/audio conversations</li>
                    <li>Watch movies or videos together</li>
                    <li>Play games with friends</li>
                    <li>Study in a virtual environment</li>
                    <li>Host virtual events and meetups</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Creating a Room
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Follow these steps to create your hangout room:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Go to the Hangout section in your dashboard</li>
                    <li>Click "Create New Room"</li>
                    <li>Choose a room name and description</li>
                    <li>Set the room type (voice only, video, or text)</li>
                    <li>Configure privacy settings</li>
                    <li>Invite friends or make it discoverable</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Privacy Settings
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Control who can access your hangout room:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Public:</strong> Anyone can join and discover your room</li>
                    <li><strong>Friends Only:</strong> Only your friends can join</li>
                    <li><strong>Invite Only:</strong> People need an invitation link</li>
                    <li><strong>Password Protected:</strong> Requires a password to enter</li>
                    <li><strong>Temporary:</strong> Room expires after a set time</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Room Management
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>As a room creator, you can:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mute or remove disruptive participants</li>
                    <li>Share your screen or files</li>
                    <li>Control room settings in real-time</li>
                    <li>Assign moderator roles to trusted friends</li>
                    <li>Record sessions (with permission)</li>
                    <li>End the room when finished</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🎉 Room Ideas</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Study group sessions with pomodoro timers</li>
                  <li>• Movie nights with synchronized streaming</li>
                  <li>• Gaming tournaments and competitions</li>
                  <li>• Book clubs and discussion groups</li>
                  <li>• Virtual coffee breaks between classes</li>
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

export default CreatingHangoutRooms;