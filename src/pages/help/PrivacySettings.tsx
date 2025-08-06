import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, EyeOff, Users, Globe } from "lucide-react";

const PrivacySettings = () => {
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
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                Profile Visibility
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Public Profile</h4>
                  <p className="text-muted-foreground mb-2">Your profile is visible to everyone on Dostiशिप and can appear in search results.</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Profile photo and name visible to all users</li>
                    <li>Bio and interests publicly searchable</li>
                    <li>Can be found through friend recommendations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Friends Only</h4>
                  <p className="text-muted-foreground mb-2">Only your friends can see your full profile information.</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Profile visible only to confirmed friends</li>
                    <li>Limited information shown to non-friends</li>
                    <li>Can still receive friend requests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Private</h4>
                  <p className="text-muted-foreground mb-2">Your profile is hidden from searches and recommendations.</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Profile not visible in search results</li>
                    <li>No friend recommendations to others</li>
                    <li>Can only be found by username or direct link</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Email Visibility</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><strong>Everyone:</strong> Email visible to all users</li>
                    <li><strong>Friends Only:</strong> Only friends can see your email</li>
                    <li><strong>Nobody:</strong> Email hidden from all users</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Phone Number</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Choose who can see your phone number</li>
                    <li>Used for account security and verification</li>
                    <li>Never shared with third parties</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Activity & Status
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Online Status</h4>
                  <p className="text-muted-foreground mb-2">Control who can see when you're online or active.</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Show online status to friends</li>
                    <li>Hide last seen timestamp</li>
                    <li>Appear offline to specific users</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Activity Feed</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Control who can see your posts and updates</li>
                    <li>Hide activity from non-friends</li>
                    <li>Limit feed visibility to close friends</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <EyeOff className="w-5 h-5 mr-2 text-primary" />
                Data & Analytics
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Usage Analytics</h4>
                  <p className="text-muted-foreground mb-2">Help us improve Dostiशिप by sharing anonymous usage data.</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>App usage patterns and feature preferences</li>
                    <li>Performance metrics and error reports</li>
                    <li>All data is anonymized and aggregated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Personalization</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Use activity data to improve recommendations</li>
                    <li>Customize content based on interests</li>
                    <li>Suggest relevant friends and groups</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">How to Update Privacy Settings</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Go to Settings from your profile menu</li>
                <li>Navigate to the "Privacy & Security" section</li>
                <li>Adjust each setting according to your preferences</li>
                <li>Save changes to apply new privacy settings</li>
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Privacy Tips</h4>
              <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>Regularly review and update your privacy settings</li>
                <li>Be cautious about sharing personal information</li>
                <li>Use strong, unique passwords for your account</li>
                <li>Report any privacy concerns to our support team</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacySettings;