import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyTips = () => {
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
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Safety Tips</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Stay safe while making new connections on Dostiशिप
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Personal Information
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Protect your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Never share your full address, phone number, or financial information</li>
                    <li>Use only your first name until you're comfortable</li>
                    <li>Avoid sharing your exact location in real-time</li>
                    <li>Be cautious about sharing school schedules or routines</li>
                    <li>Don't share passwords or login credentials</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Meeting in Person
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>If you decide to meet someone offline:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Meet in public places like cafes, libraries, or campus areas</li>
                    <li>Tell a friend or family member where you're going</li>
                    <li>Plan your own transportation</li>
                    <li>Trust your instincts - if something feels wrong, leave</li>
                    <li>Consider group meetups for initial meetings</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Red Flags to Watch For
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Be aware of these warning signs:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Requests for money or financial assistance</li>
                    <li>Pressure to share personal information quickly</li>
                    <li>Inconsistent stories or information</li>
                    <li>Attempts to move conversations off the platform immediately</li>
                    <li>Inappropriate or aggressive messages</li>
                    <li>Requests for intimate photos or videos</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Reporting and Blocking</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Know how to protect yourself:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Block users who make you uncomfortable</li>
                    <li>Report suspicious or inappropriate behavior</li>
                    <li>Use privacy settings to control who can contact you</li>
                    <li>Don't hesitate to seek help from platform moderators</li>
                  </ul>
                </div>
              </section>

              <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200">🚨 Emergency Contacts</h3>
                <div className="space-y-2 text-red-700 dark:text-red-300">
                  <p>If you ever feel unsafe or threatened:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Contact local emergency services immediately</li>
                    <li>Report serious threats to platform administrators</li>
                    <li>Contact Atharav Tarika: 9466903617 or atharavtarika@dostiship.com</li>
                    <li>Contact trusted friends or family members</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SafetyTips;