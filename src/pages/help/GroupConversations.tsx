import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, MessageCircle, Settings, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const GroupConversations = () => {
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
                <CardTitle className="text-3xl">Group Conversations</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Create and manage group chats for study sessions and social activities
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Creating Groups
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Start group conversations with multiple friends:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Go to Messages and click "New Group"</li>
                    <li>Add friends by searching their names</li>
                    <li>Set a group name and description</li>
                    <li>Choose a group photo (optional)</li>
                    <li>Select privacy settings (open/closed/secret)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Group Features
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Make the most of your group conversations:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Share files, images, and links</li>
                    <li>Pin important messages</li>
                    <li>Use @mentions to get someone's attention</li>
                    <li>React to messages with emojis</li>
                    <li>Schedule study sessions and events</li>
                    <li>Create polls for group decisions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Admin Privileges
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>As a group admin, you can:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Add or remove members</li>
                    <li>Change group settings and description</li>
                    <li>Pin and unpin messages</li>
                    <li>Mute or remove disruptive members</li>
                    <li>Assign other members as admins</li>
                    <li>Delete the group if needed</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Group Settings
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Customize your group experience:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Notifications:</strong> Control how you receive group updates</li>
                    <li><strong>Privacy:</strong> Set who can join and see group content</li>
                    <li><strong>Member Permissions:</strong> Control who can add members</li>
                    <li><strong>Message History:</strong> Choose if new members see old messages</li>
                    <li><strong>File Sharing:</strong> Enable/disable file uploads</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Group Etiquette</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Stay on topic and keep discussions relevant</li>
                  <li>• Use @mentions sparingly to avoid spam</li>
                  <li>• Respect different time zones</li>
                  <li>• Share resources that benefit everyone</li>
                  <li>• Be inclusive and welcoming to new members</li>
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

export default GroupConversations;