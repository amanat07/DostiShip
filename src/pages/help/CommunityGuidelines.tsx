import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Heart, MessageCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityGuidelines = () => {
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
                <CardTitle className="text-3xl">Community Guidelines</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Help us maintain a safe, respectful, and inclusive community for everyone
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Be Respectful & Kind
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Treat everyone with respect and kindness:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use inclusive and welcoming language</li>
                    <li>Respect different opinions, backgrounds, and cultures</li>
                    <li>Be patient with newcomers to the platform</li>
                    <li>Offer constructive feedback, not criticism</li>
                    <li>Celebrate others' achievements and successes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Communication Standards
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Maintain positive communication:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Keep conversations friendly and appropriate</li>
                    <li>Avoid spam, excessive messaging, or harassment</li>
                    <li>Respect people's boundaries and response times</li>
                    <li>Use clear, understandable language</li>
                    <li>Report inappropriate behavior promptly</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Prohibited Content
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>The following content is not allowed:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hate speech, discrimination, or bullying</li>
                    <li>Inappropriate, explicit, or adult content</li>
                    <li>Spam, advertising, or promotional content</li>
                    <li>False information or impersonation</li>
                    <li>Threats, violence, or dangerous activities</li>
                    <li>Illegal activities or content</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Academic Integrity</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>For study groups and academic discussions:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Don't share completed assignments or exams</li>
                    <li>Encourage learning and understanding, not cheating</li>
                    <li>Respect your institution's academic policies</li>
                    <li>Help others learn concepts, don't do their work</li>
                    <li>Be honest about your academic capabilities</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Privacy & Safety</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Protect yourself and others:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Don't share personal information of others</li>
                    <li>Respect privacy settings and boundaries</li>
                    <li>Report suspicious or unsafe behavior</li>
                    <li>Use platform features responsibly</li>
                    <li>Help create a safe environment for everyone</li>
                  </ul>
                </div>
              </section>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">💙 Our Commitment</h3>
                <p className="text-blue-700 dark:text-blue-300">
                  We're committed to maintaining a positive, inclusive community where everyone feels welcome. 
                  Violations of these guidelines may result in warnings, temporary suspensions, or permanent account removal. 
                  Thank you for helping us build a better Dostiशिप community!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityGuidelines;