import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Trash2, Download, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const AccountDeletion = () => {
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
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-destructive" />
                </div>
                <CardTitle className="text-3xl">Account Deletion</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Important information about permanently deleting your Dostiशिप account
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Warning
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  Account deletion is permanent and cannot be undone. All your data, including messages, 
                  posts, friends, and profile information will be permanently removed.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Before You Delete
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Before deleting your account, consider:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Download your data:</strong> Save important messages and posts</li>
                    <li><strong>Inform your friends:</strong> Let close friends know about your decision</li>
                    <li><strong>Consider deactivation:</strong> Temporarily disable instead of deleting</li>
                    <li><strong>Export contacts:</strong> Save important friend connections</li>
                    <li><strong>Backup memories:</strong> Save photos and meaningful conversations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">What Gets Deleted</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>When you delete your account, the following will be permanently removed:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your profile and all personal information</li>
                    <li>All messages and conversation history</li>
                    <li>Posts, comments, and journal entries</li>
                    <li>Friend connections and group memberships</li>
                    <li>Event participations and hangout history</li>
                    <li>Settings and preferences</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Deletion Process
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>How account deletion works:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to Settings → Privacy & Security → Account Deletion</li>
                    <li>Confirm your identity with password verification</li>
                    <li>Review what will be deleted</li>
                    <li>Choose immediate deletion or 30-day grace period</li>
                    <li>Receive confirmation email</li>
                    <li>Account becomes inaccessible immediately</li>
                    <li>Data permanently deleted after grace period (if selected)</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Recovery Options</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Limited recovery options:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>30-day grace period:</strong> Reactivate within 30 days if selected</li>
                    <li><strong>Contact support:</strong> Limited assistance available within 48 hours</li>
                    <li><strong>No data recovery:</strong> After grace period, no data can be recovered</li>
                  </ul>
                </div>
              </section>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">💙 Need Help?</h3>
                <p className="text-blue-700 dark:text-blue-300 mb-3">
                  If you're having issues with the platform, consider reaching out to our support team before deleting your account. 
                  We're here to help resolve any problems you might be experiencing.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountDeletion;