import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, UserX, AlertTriangle, Undo } from "lucide-react";

const BlockingUsers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24 pt-32">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Help Center
        </Button>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <UserX className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Blocking Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                What Happens When You Block Someone
              </h3>
              <div className="space-y-4 ml-7">
                <p className="text-muted-foreground mb-4">
                  Blocking a user prevents them from contacting you and limits their ability to see your content on Dostiशिप.
                </p>
                <div>
                  <h4 className="font-medium mb-2">They Cannot:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Send you direct messages or friend requests</li>
                    <li>See your posts or profile information</li>
                    <li>Tag you in posts or comments</li>
                    <li>Invite you to groups or events</li>
                    <li>See when you're online or active</li>
                    <li>Find you in search results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">You Cannot:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>See their posts or profile</li>
                    <li>Send them messages</li>
                    <li>Add them as a friend</li>
                    <li>See their activity in mutual groups</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <UserX className="w-5 h-5 mr-2 text-primary" />
                How to Block a User
              </h3>
              <div className="space-y-6 ml-7">
                <div>
                  <h4 className="font-medium mb-2">From Their Profile:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Visit the user's profile page</li>
                    <li>Click the three dots menu (⋯) next to their name</li>
                    <li>Select "Block User" from the dropdown</li>
                    <li>Confirm your decision in the popup dialog</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">From a Message:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Open the conversation with the user</li>
                    <li>Click on their name at the top of the chat</li>
                    <li>Select "Block User" from the options</li>
                    <li>Confirm to block and end the conversation</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">From a Post or Comment:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Click the three dots menu on their post/comment</li>
                    <li>Select "Block User"</li>
                    <li>Confirm your decision</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Undo className="w-5 h-5 mr-2 text-primary" />
                How to Unblock a User
              </h3>
              <div className="space-y-4 ml-7">
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                  <li>Go to your Settings page</li>
                  <li>Navigate to "Privacy & Security"</li>
                  <li>Find the "Blocked Users" section</li>
                  <li>Locate the user you want to unblock</li>
                  <li>Click "Unblock" next to their name</li>
                  <li>Confirm your decision to unblock them</li>
                </ol>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Note:</strong> After unblocking, you'll need to send a new friend request if you want to reconnect.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Mutual Friends and Groups
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Mutual Friends:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Blocking doesn't affect your mutual friendships</li>
                    <li>You won't see each other's interactions on friends' posts</li>
                    <li>Friends aren't notified when you block someone</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Group Interactions:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>You'll both remain in mutual groups</li>
                    <li>Their messages in groups will be hidden from you</li>
                    <li>You can't interact with each other in group settings</li>
                    <li>Consider leaving groups if interactions become problematic</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-medium mb-2 text-red-900 dark:text-red-100">When to Block vs. Report</h4>
              <div className="text-sm text-red-800 dark:text-red-200 space-y-2">
                <p><strong>Block when:</strong> You want to avoid contact with someone but they haven't violated community guidelines.</p>
                <p><strong>Report when:</strong> Someone is harassing you, sharing inappropriate content, or violating our community standards.</p>
                <p><strong>Do both when:</strong> Someone is seriously harassing you or making you feel unsafe.</p>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Need Additional Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If blocking isn't sufficient to resolve your issue, our support team can provide additional assistance.
              </p>
              <Button variant="outline" onClick={() => window.open('/contact', '_blank')}>
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BlockingUsers;