import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Mail, Smartphone, Volume2, MessageCircle, Users } from "lucide-react";

const NotificationPreferences = () => {
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
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary" />
                Types of Notifications
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Social Notifications:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>New friend requests</li>
                    <li>Friend request acceptances</li>
                    <li>Birthday reminders for friends</li>
                    <li>Friend activity updates</li>
                    <li>New followers (if public profile)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Message Notifications:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>New direct messages</li>
                    <li>Group message activity</li>
                    <li>Message reactions and replies</li>
                    <li>Voice and video call notifications</li>
                    <li>Missed call alerts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Community Notifications:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Group invitations</li>
                    <li>Event invitations and reminders</li>
                    <li>Comments on your posts</li>
                    <li>Likes and reactions to your content</li>
                    <li>Mentions in posts or comments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Security & Account:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Login from new devices</li>
                    <li>Password changes</li>
                    <li>Security setting modifications</li>
                    <li>Suspicious account activity</li>
                    <li>Account verification requests</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-primary" />
                Push Notifications
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Managing Push Notifications:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to Settings → Notifications</li>
                    <li>Find "Push Notifications" section</li>
                    <li>Toggle notifications for different categories</li>
                    <li>Set quiet hours to avoid late-night alerts</li>
                    <li>Choose notification sounds and vibration patterns</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notification Frequency:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><strong>Immediate:</strong> Get notified instantly</li>
                    <li><strong>Hourly Digest:</strong> Receive bundled notifications every hour</li>
                    <li><strong>Daily Summary:</strong> Get a daily recap of activity</li>
                    <li><strong>Off:</strong> No push notifications for this category</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Priority Notifications:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Important messages from close friends</li>
                    <li>Emergency or urgent notifications</li>
                    <li>Security alerts and account warnings</li>
                    <li>Time-sensitive event reminders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                Email Notifications
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Email Notification Types:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Weekly activity summaries</li>
                    <li>Monthly friend highlights</li>
                    <li>Important account updates</li>
                    <li>Security alerts and warnings</li>
                    <li>Feature announcements and tips</li>
                    <li>Community newsletters</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Email Frequency Settings:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><strong>Real-time:</strong> Immediate email alerts</li>
                    <li><strong>Daily:</strong> Once per day digest</li>
                    <li><strong>Weekly:</strong> Weekly summary emails</li>
                    <li><strong>Monthly:</strong> Monthly recap only</li>
                    <li><strong>Never:</strong> No promotional emails</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Managing Email Preferences:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to Settings → Notifications</li>
                    <li>Scroll to "Email Notifications" section</li>
                    <li>Toggle each email type on or off</li>
                    <li>Set frequency for different email categories</li>
                    <li>Update your email address if needed</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Volume2 className="w-5 h-5 mr-2 text-primary" />
                Sound & Vibration Settings
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Notification Sounds:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Choose different sounds for different notification types</li>
                    <li>Set custom notification tones</li>
                    <li>Adjust notification volume</li>
                    <li>Enable/disable sound for each category</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Vibration Patterns:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Customize vibration for messages</li>
                    <li>Set different patterns for calls</li>
                    <li>Adjust vibration intensity</li>
                    <li>Enable/disable vibration completely</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Quiet Hours:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Set specific times for no notifications</li>
                    <li>Allow emergency notifications during quiet hours</li>
                    <li>Weekend and weekday different schedules</li>
                    <li>Override quiet hours for priority contacts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Advanced Notification Settings
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Smart Notifications:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>AI-powered notification filtering</li>
                    <li>Reduced notifications for less important activity</li>
                    <li>Prioritize notifications from close friends</li>
                    <li>Adaptive notification timing based on usage patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Group Notification Settings:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Customize notifications for each group</li>
                    <li>Mute notifications for specific groups</li>
                    <li>Get notified only when mentioned</li>
                    <li>Set different schedules for different groups</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notification Grouping:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Bundle similar notifications together</li>
                    <li>Expand grouped notifications for details</li>
                    <li>Set limits on notification stacking</li>
                    <li>Clear all notifications with one action</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium mb-2 text-yellow-900 dark:text-yellow-100">Notification Best Practices</h4>
              <ul className="list-disc list-inside text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>Enable security notifications for account safety</li>
                <li>Use quiet hours to maintain work-life balance</li>
                <li>Prioritize notifications from close friends and family</li>
                <li>Review and adjust settings regularly</li>
                <li>Use email digests instead of immediate alerts to reduce interruptions</li>
                <li>Customize sounds to distinguish between notification types</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Troubleshooting Notifications</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Not receiving notifications or getting too many? Check your device settings and app permissions.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  <strong>Common Issues:</strong> Check device notification permissions, ensure app is not in battery optimization, verify email address is correct.
                </p>
                <Button variant="outline" onClick={() => window.open('/contact', '_blank')}>
                  Get Notification Help
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default NotificationPreferences;