import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, Phone, Mic, MicOff, VideoOff } from "lucide-react";
import { Link } from "react-router-dom";

const VoiceVideoCalls = () => {
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
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Voice & Video Calls</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Connect face-to-face with your friends through voice and video calls
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Making Calls
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Start voice or video calls with your friends:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Click the video or voice call icon in any chat</li>
                    <li>Make sure both parties have agreed to the call</li>
                    <li>Choose between voice-only or video calls</li>
                    <li>Test your microphone and camera before important calls</li>
                    <li>Find a quiet, well-lit space for video calls</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Call Controls
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>During calls, you can:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Mute/Unmute:</strong> Control your microphone</li>
                    <li><strong>Video On/Off:</strong> Turn your camera on or off</li>
                    <li><strong>Screen Sharing:</strong> Share your screen for study sessions</li>
                    <li><strong>End Call:</strong> Hang up when you're finished</li>
                    <li><strong>Chat:</strong> Send messages during the call</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>For the best calling experience:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use headphones to prevent echo</li>
                    <li>Ensure stable internet connection</li>
                    <li>Choose appropriate timing for calls</li>
                    <li>Be mindful of background noise</li>
                    <li>Respect others' time and availability</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">📞 Call Ideas</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Virtual study sessions with screen sharing</li>
                  <li>• Catch up calls with distant friends</li>
                  <li>• Group project discussions</li>
                  <li>• Language practice conversations</li>
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

export default VoiceVideoCalls;