import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flag, AlertTriangle, Shield, Clock } from "lucide-react";

const ReportingIssues = () => {
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
              <Flag className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Reporting Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                What You Can Report
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Inappropriate Content:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Spam or unwanted messages</li>
                    <li>Hate speech or discriminatory content</li>
                    <li>Bullying or harassment</li>
                    <li>Explicit or inappropriate images</li>
                    <li>Violent or threatening content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">User Behavior:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Fake or impersonation accounts</li>
                    <li>Scamming or fraudulent activity</li>
                    <li>Underage users (under 13)</li>
                    <li>Sharing personal information without consent</li>
                    <li>Repeated unwanted contact</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Technical Issues:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>App crashes or performance problems</li>
                    <li>Features not working correctly</li>
                    <li>Account access issues</li>
                    <li>Data synchronization problems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Flag className="w-5 h-5 mr-2 text-primary" />
                How to Report Content or Users
              </h3>
              <div className="space-y-6 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Report a Post:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Find the three dots menu (⋯) on the post</li>
                    <li>Click "Report Post" from the dropdown</li>
                    <li>Select the reason for reporting</li>
                    <li>Provide additional details if needed</li>
                    <li>Submit your report</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Report a User:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to the user's profile page</li>
                    <li>Click the three dots menu next to their name</li>
                    <li>Select "Report User"</li>
                    <li>Choose the appropriate violation category</li>
                    <li>Describe the issue in detail</li>
                    <li>Submit the report</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Report a Message:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Long-press on the problematic message</li>
                    <li>Select "Report Message" from the menu</li>
                    <li>Choose the violation type</li>
                    <li>Add context about the issue</li>
                    <li>Submit your report</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Report Categories
              </h3>
              <div className="space-y-4 ml-7">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Harassment & Bullying</h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Targeted harassment</li>
                      <li>Cyberbullying</li>
                      <li>Threats or intimidation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Hate Speech</h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Discrimination based on identity</li>
                      <li>Offensive language or slurs</li>
                      <li>Promoting hatred</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Spam & Fraud</h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Repetitive unwanted content</li>
                      <li>Scam attempts</li>
                      <li>Fake accounts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Inappropriate Content</h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Explicit or adult content</li>
                      <li>Violence or gore</li>
                      <li>Self-harm content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                What Happens After You Report
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Review Process:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Your report is immediately sent to our moderation team</li>
                    <li>We review reports within 24-48 hours</li>
                    <li>Urgent safety issues are prioritized and reviewed immediately</li>
                    <li>You'll receive an update on the status of your report</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Possible Actions:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Content removal or user warning</li>
                    <li>Temporary account suspension</li>
                    <li>Permanent account ban for serious violations</li>
                    <li>No action if content doesn't violate guidelines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Your Privacy:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Reports are anonymous to the reported user</li>
                    <li>Your identity is protected during the review process</li>
                    <li>Only our moderation team can see who made the report</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium mb-2 text-yellow-900 dark:text-yellow-100">Emergency Situations</h4>
              <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                <p>If you're in immediate danger or experiencing a mental health crisis:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Contact local emergency services immediately</li>
                  <li>Reach out to a trusted friend, family member, or counselor</li>
                  <li>Use crisis helplines in your area</li>
                  <li>Report the situation to us, but prioritize your immediate safety</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">False Reports</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Please only report content that genuinely violates our community guidelines. False or malicious reports may result in restrictions on your account.
              </p>
              <Button variant="outline" onClick={() => window.open('/guidelines', '_blank')}>
                Read Community Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ReportingIssues;